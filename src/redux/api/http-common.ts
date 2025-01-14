import axios from "axios";
import Cookies from "js-cookie";

export const API_URL = "https://api.zusammenreisen.com/api";

export const callAPi = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-type": "application/json",
  },
});

export const callAPiMultiPart = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-type": "multipart/form-data",
  },
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (token) {
      prom.resolve(token);
    } else {
      prom.reject(error);
    }
  });
  failedQueue = [];
};

const refreshAccessToken = async () => {
  const refreshToken = Cookies.get("refreshToken");
  if (!refreshToken) {
    console.error("No refresh token available.");
    return null;
  }

  try {
    const response = await axios.post(`${API_URL}/auth/jwt/refresh/`, {
      refresh: refreshToken,
    });
    const newAccessToken = response.data.access;

    Cookies.set("accessToken", newAccessToken, {
      path: "/",
      secure: true,
      sameSite: "strict",
    });

    return newAccessToken;
  } catch (error) {
    console.error(
      "Error refreshing access token:",
      error.response?.data || error.message
    );
    return null;
  }
};

const attachAuthorizationHeader = (config: any) => {
  const accessToken = Cookies.get("accessToken");
  if (accessToken) {
    config.headers.Authorization = `JWT ${accessToken}`;
  }
  return config;
};

callAPi.interceptors.request.use(attachAuthorizationHeader, (error) =>
  Promise.reject(error)
);
callAPiMultiPart.interceptors.request.use(attachAuthorizationHeader, (error) =>
  Promise.reject(error)
);

const responseInterceptor = async (error: any) => {
  const originalRequest = error.config;

  if (error.response?.status === 401 && !originalRequest._retry) {
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then((token) => {
          originalRequest.headers.Authorization = `JWT ${token}`;
          return axios(originalRequest);
        })
        .catch((err) => Promise.reject(err));
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      const newAccessToken = await refreshAccessToken();
      if (!newAccessToken) {
        return Promise.reject("Unable to refresh token. Logging out.");
      }

      processQueue(null, newAccessToken);
      originalRequest.headers.Authorization = `JWT ${newAccessToken}`;
      return axios(originalRequest);
    } catch (err) {
      processQueue(err, null);
      return Promise.reject(err);
    } finally {
      isRefreshing = false;
    }
  }

  // If the error is not a 401 or retry has failed, propagate the original error.
  return Promise.reject(error.response?.data || error.message);
};

callAPi.interceptors.response.use(
  (response) => response,
  (error) => responseInterceptor(error)
);

callAPiMultiPart.interceptors.response.use(
  (response) => response,
  (error) => responseInterceptor(error)
);

export const scheduleTokenRefresh = () => {
  setInterval(async () => {
    try {
      const token = await refreshAccessToken();
      if (token) {
        console.log("Access token refreshed successfully.");
      }
    } catch (err) {
      console.error("Error refreshing access token:", err);
    }
  }, 8 * 60 * 1000); // 8 minutes
};

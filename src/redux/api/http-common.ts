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

const attachAuthorizationHeader = (config: any) => {
  const accessToken = Cookies.get("accessToken");
  if (accessToken) {
    config.headers.Authorization = `JWT ${accessToken}`;
  }
  return config;
};

// Attach request interceptors
callAPi.interceptors.request.use(attachAuthorizationHeader, (error) =>
  Promise.reject(error)
);
callAPiMultiPart.interceptors.request.use(attachAuthorizationHeader, (error) =>
  Promise.reject(error)
);

// Add response interceptors to handle token expiration
const handleTokenExpiration = async (error: any) => {
  const originalRequest = error.config;

  if (
    error.response &&
    error.response.data &&
    error.response.data.errors &&
    error.response.data.errors.some(
      (err: any) => err.code === "token_not_valid"
    ) &&
    !originalRequest._retry
  ) {
    originalRequest._retry = true;

    try {
      // Send refresh token API
      const refreshToken = Cookies.get("refreshToken");
      const response = await axios.post(`${API_URL}/auth/jwt/refresh/`, {
        refresh: refreshToken,
      });

      const newAccessToken = response.data.access;
      Cookies.set("accessToken", newAccessToken); // Save the new access token in cookies

      // Update the Authorization header in the original request
      originalRequest.headers.Authorization = `JWT ${newAccessToken}`;

      // Retry the original request
      return callAPi(originalRequest);
    } catch (refreshError) {
      console.error("Failed to refresh token:", refreshError);
      // Optionally, handle logout or token refresh failure
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      window.location.href = "/login"; // Redirect to login
      return Promise.reject(refreshError);
    }
  }

  return Promise.reject(error);
};

// Attach response interceptors
callAPi.interceptors.response.use(
  (response) => response,
  handleTokenExpiration
);

callAPiMultiPart.interceptors.response.use(
  (response) => response,
  handleTokenExpiration
);

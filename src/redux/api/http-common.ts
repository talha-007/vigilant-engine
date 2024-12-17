import axios from "axios";

export const API_URL = "https://api.zusammenreisen.com/api";
export const IMAGE_BASEURL = "https://api.zusammenreisen.com/api";
// export const API_URL = 'https://api.membersverify.com/';
// export const IMAGE_BASEURL = 'https://api.membersverify.com/';

export const callAPi = axios.create({
  withCredentials: true,
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

callAPiMultiPart.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token && token !== undefined) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

callAPi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token && token !== undefined) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

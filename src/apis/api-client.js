import axios from "axios";
import toast from "react-hot-toast";
import store from "../redux/store";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:9000/api",
  withCredentials: true,
});

// =======================
// TOKEN SOURCE (FIXED)
// =======================
const getAccessToken = () => {
  return (
    store.getState()?.auth?.accessToken ||
    localStorage.getItem("accessToken")
  );
};

// =======================
// REQUEST INTERCEPTOR
// =======================
apiClient.interceptors.request.use(
  (config) => {
    const url = config?.url || "";
    const isAuthEndpoint =
      url.includes("/login") ||
      url.includes("/signup") ||
      url.includes("/refresh-token");

    if (!isAuthEndpoint) {
      const token = getAccessToken();

      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// =======================
// RESPONSE INTERCEPTOR
// =======================
apiClient.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error?.config;
    const url = originalRequest?.url || "";

    const isAuthEndpoint =
      url.includes("/login") ||
      url.includes("/signup") ||
      url.includes("/refresh-token");

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      !isAuthEndpoint
    ) {
      originalRequest._retry = true;

      try {
        const refreshUrl = `${apiClient.defaults.baseURL}/users/refresh-token`;
        const res = await axios.post(refreshUrl, {}, { withCredentials: true });

        const newAccessToken = res.data.accessToken;

        // =======================
        // UPDATE BOTH STORAGE LAYERS
        // =======================
        store.dispatch({
          type: "auth/setAccessToken",
          payload: newAccessToken,
        });

        localStorage.setItem("accessToken", newAccessToken);

        // Update header for the original request and retry
        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return apiClient(originalRequest);

      } catch (refreshError) {
        console.error("Refresh failed:", refreshError);

        // CLEAN LOGOUT (NO HARD REDIRECT HERE)
        store.dispatch({ type: "auth/logout" });

        localStorage.removeItem("accessToken");

        toast.error("Session expired. Please login again.");

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;

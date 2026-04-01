import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const apiClient = axios.create({
  baseURL: process.env.API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});


// FUNCTION → Get token from cookies or localStorage
const getAccessToken = () => {
  return Cookies.get("authToken") || localStorage.getItem("authToken");
};

const getRefreshToken = () => {
  return Cookies.get("refreshToken") || localStorage.getItem("refreshToken");
};



// REQUEST INTERCEPTOR
apiClient.interceptors.request.use(
  (config) => {
    const isAuthEndpoint =
      config.url.includes("/login") ||
      config.url.includes("/signup") ||
      config.url.includes("/refresh-token");

    if (!isAuthEndpoint) {
      const token = getAccessToken();

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);



// RESPONSE INTERCEPTOR
apiClient.interceptors.response.use(
  (response) => response,


  async (error) => {
    console.error("API Error:", error.response || error);
    const originalRequest = error.config;

    const isAuthEndpoint =
      originalRequest?.url.includes("/login") ||
      originalRequest?.url.includes("/signup") ||
      originalRequest?.url.includes("/refresh-token");

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isAuthEndpoint
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken = getRefreshToken();

        if (!refreshToken) {
          throw new Error("No refresh token found");
        }

        const refreshUrl =
          process.env.NODE_ENV === "development"
            ? "http://localhost:5000/api/users/refresh-token"
            : `${process.env.NEXT_PUBLIC_API_URL}/users/refresh-token`;

        const res = await axios.post(
          refreshUrl,
          { refreshToken },
          { withCredentials: true }
        );

        const newAccessToken = res.data.accessToken;

        // Save token everywhere
        localStorage.setItem("authToken", newAccessToken);
        Cookies.set("authToken", newAccessToken);

        // Update request header
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return apiClient(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token failed", refreshError);

        // Clear storage
        localStorage.removeItem("authToken");
        localStorage.removeItem("refreshToken");

        Cookies.remove("authToken");
        Cookies.remove("refreshToken");

        toast.error("Session expired. Please login again.");

        window.location.href = "/auth/sign-in";

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
import axios from "axios";

const api = axios.create({

  baseURL:
    // "https://localhost:7048/api",
    "https://hsd-taskmanager-api-g9hva3b9asbgg8hb.centralindia-01.azurewebsites.net/api",

  headers: {
    "Content-Type":
      "application/json",
  },

});

// ATTACH JWT TOKEN
api.interceptors.request.use(

  (config) => {

    const token =
      localStorage.getItem("token");

    if (token) {

      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  },

  (error) => {

    return Promise.reject(error);
  }
);

// HANDLE TOKEN EXPIRATION
api.interceptors.response.use(

  (response) => {

    return response;
  },

  (error) => {

    // SESSION EXPIRED
    if (
      error.response &&
      error.response.status === 401
    ) {

      // CLEAR STORAGE
      localStorage.removeItem("token");

      localStorage.removeItem("role");

      localStorage.removeItem("userName");

      // SHOW MESSAGE
      alert(
        "Session Expired. Please Login Again."
      );

      // REDIRECT LOGIN
      window.location.href = "/";
    }

    return Promise.reject(error);
  }
);

export default api;
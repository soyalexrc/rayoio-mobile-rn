import axios from "axios";

const axiosInstance = axios.create({
  baseURL: 'https://us-central1-rayoio.cloudfunctions.net/',
  headers: { "Access-Control-Allow-Origin": "*" },
  mode: "CORS",
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "Something went wrong"
    )
);

export default axiosInstance;

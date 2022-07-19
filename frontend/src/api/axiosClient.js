// api/axiosClient.js
import axios from "axios";
import queryString from "query-string";
// Set up default config for http requests here

// Please have a look at here `https://github.com/axios/axios#request-config` for the full list of configs

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "content-type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});
// axiosClient.defaults.headers.common["Authorization"] =
//   localStorage.getItem("token") || "";

axiosClient.interceptors.request.use(async (config) => {
  // Handle token here ...
  config.headers.common["Authorization"] = localStorage.getItem("token") || "";
  // console.log(token);
  return config;
});
axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    return error.response.data;
  }
);
export default axiosClient;

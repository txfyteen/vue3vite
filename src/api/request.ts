import axios from "axios";
const instance = axios.create({
  baseURL: "",
  timeout: 15000,
});
instance.interceptors.request.use(
  (config) => {
    return config;
  },
  async (error) => {
    return await Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (result) => {
    return result.data;
  },
  async (error) => {
    return await Promise.reject(error);
  }
);

export default instance;

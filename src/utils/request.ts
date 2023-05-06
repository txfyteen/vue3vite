import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { ElMessage } from "element-plus";
import router from "@/routers";

export interface Result<T> {
  code: string;
  message: string;
  result: T;
}
const redirectToLogin = () => {
  localStorage.setItem("token", "");
  localStorage.setItem("userName", "");
  router.push({ name: "login" });
};

export type PromiseRes<T> = Promise<Result<T>>;

export enum RequestEnums {
  TIMEOUT = 20000,
  OVERDUE = 600, // 登录失效
  FAIL = 999, // 请求失败
  SUCCESS = "0000000", // 请求成功
}

const config = {
  baseURL: import.meta.env.VITE_API_URL as string,
  timeOut: RequestEnums.TIMEOUT,
  withCredentials: true,
};

class RequestHttp {
  service: AxiosInstance;

  public constructor(config: AxiosRequestConfig) {
    this.service = axios.create(config);
    // 设置请求拦截器
    this.service.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("token") ?? "";
        if (token) {
          // config.headers.Authorization = token;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    // 设置响应拦截器
    this.service.interceptors.response.use(
      (response) => {
        const apiData = response.data;
        const { code, message } = apiData;
        if (code === undefined) {
          ElMessage.error("非本系统的接口");
          return Promise.reject(new Error("非本系统的接口"));
        } else {
          switch (code) {
            case "0000000":
              // code === 0000000 代表没有错误
              return apiData;
            case "C000001":
            case "C000002":
              ElMessage.error(message || "Error");
              redirectToLogin();
              break;
            default:
              // 不是正确的 Code
              ElMessage.error(message || "Error");
              return Promise.reject("Error");
          }
        }
      },
      async (error) => {
        const { response } = error;
        if (response) {
          this.handleCode(response.status);
        }
        if (!window.navigator.onLine) {
          ElMessage.error("网络连接失败");
        }
        return Promise.reject("Error");
      }
    );
  }

  handleCode(code: number): void {
    switch (code) {
      case 401:
        ElMessage.error("登录失败，请重新登录");
        redirectToLogin();
        break;
      default:
        ElMessage.error("请求失败");
        break;
    }
  }

  // 常用方法封装.想反悔一个Promise给前端
  async get<T>(url: string, params?: object): PromiseRes<T> {
    return this.service.get(url, { params });
  }

  async post<T>(url: string, params?: object): PromiseRes<T> {
    return this.service.post(url, params);
  }

  async put<T>(url: string, params?: object, config?: object): PromiseRes<T> {
    return this.service.put(url, params, config);
  }

  async delete<T>(url: string, params?: object): PromiseRes<T> {
    return this.service.delete(url, { params });
  }

  /**
   * 上传文件
   * @param {File} file 文件
   * @param {RefImpl} progress 上传进度
   * @returns promise
   */
  async uploadFile<T>(url: string, formData: FormData): PromiseRes<T> {
    return this.service.post(url, formData);
  }
}

export default new RequestHttp(config);

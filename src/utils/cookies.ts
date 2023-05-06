import CacheKey from "@/constants/cacheKey";
import Cookies from "js-cookie";

/**
 * 获取token
 */
export const getToken = () => {
  return Cookies.get(CacheKey.TOKEN);
};

/**
 * 设置token
 */
export const setToken = (token: string) => {
  Cookies.set(CacheKey.TOKEN, token);
};
/**
 * 移除token
 */
export const removeToken = () => {
  Cookies.remove(CacheKey.TOKEN);
};

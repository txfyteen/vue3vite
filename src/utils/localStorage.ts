import CacheKey from "@/constants/cacheKey";

export const getSidebarStatus = () => {
  return localStorage.getItem(CacheKey.SIDEBAR_STATUS);
};

export const setSidebarStatus = (sidebarStatus: "opened" | "closed") => {
  localStorage.setItem(CacheKey.SIDEBAR_STATUS, sidebarStatus);
};

export const getActiveThemeName = () => {
  return localStorage.getItem(CacheKey.ACTIVE_THEME_NAME);
};

export const setActiveThemeName = (themeName: any) => {
  localStorage.setItem(CacheKey.ACTIVE_THEME_NAME, themeName);
};

export const getItem = (key: string) => {
  return localStorage.getItem(key);
};

export const setItem = (key: string, value: any) => {
  localStorage.setItem(key, value);
};

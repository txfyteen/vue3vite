import { defineStore, createPinia } from "pinia";
import piniaPersistConfig from "@/config/pinaiPersist";
import piniaPluginPersistedState from "pinia-plugin-persistedstate";

export const useWebStore = defineStore("webStore", {
  // vuex 可以自行推断类型
  state: () => ({
    token: "",
    userInfo: {},
    language: "",
  }),
  getters: {},
  actions: {
    // 这里面不能用箭头函数， this 在这里面表示 当前的store
    setToken(token: string) {
      this.token = token;
    },

    setUserInfo(userInfo: any) {
      this.userInfo = userInfo;
    },
  },
  // 需要接受一个对象，这个对象说就是
  persist: piniaPersistConfig("webStore"),
});

import { defineStore } from "pinia";
export interface KeepAliveState {
  keepAliveName: string[];
}
// KeepAliveStore
export const useKeepAliveStore = defineStore({
  id: "KeepAliveStore",
  state: (): KeepAliveState => ({
    keepAliveName: [],
  }),
  actions: {
    // addKeepAliveName
    async addKeepAliveName(name: string) {
      !this.keepAliveName.includes(name) && this.keepAliveName.push(name);
    },
    // removeKeepAliveName
    async removeKeepAliveName(name: string) {
      this.keepAliveName = this.keepAliveName.filter((item) => item !== name);
    },
    // setKeepAliveName
    async setKeepAliveName(keepAliveName: string[] = []) {
      this.keepAliveName = keepAliveName;
    },
  },
});

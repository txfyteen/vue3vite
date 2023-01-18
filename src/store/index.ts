import { createPinia } from "pinia";
import { App } from "vue";
import piniaPluginPersistedState from "pinia-plugin-persistedstate";
const pinia = createPinia();
pinia.use(piniaPluginPersistedState);
export const setupStore = (app: App<Element>) => {
  app.use(pinia);
};

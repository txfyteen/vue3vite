import { createApp } from "vue";
import App from "./App.vue";

const app = createApp(App);
import { setupStore } from "@/store";
import { setupRouter } from "@/routers/index";
// 初始化element攒尖
import { setupElementPlus, setupCustomComponents } from "@/plugins";
// 引入静态资源
import "@/plugins/assets";
function setupApp() {
  // 初始化store
  setupStore(app);
  // 初始化路由
  setupRouter(app);
  // 初始化相关插件 elementplugs
  app.mount("#app");
}
setupElementPlus(app);
// 初始化自定义组件
setupCustomComponents(app);
setupApp();

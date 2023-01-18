// element plus
import type { App } from "vue";
import ElementPlus from "element-plus";
import * as Icons from "@element-plus/icons-vue";
import "element-plus/dist/index.css";
import "element-plus/theme-chalk/dark/css-vars.css";
import "@/styles/theme/element-dark.scss";
import "@/styles/element.scss";
export function setupElementPlus(app: App<Element>) {
  app.use(ElementPlus);
  // 注册element Icons组件
  Object.keys(Icons).forEach((key) => {
    app.component(key, Icons[key as keyof typeof Icons]);
  });
}

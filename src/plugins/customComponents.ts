import { App } from "vue";

import SvgIcon from "@/components/SvgIcon/index.vue";

/**
 * 全局注册自定义组件
 * @param app
 */
export function setupCustomComponents(app: App) {
  console.log(SvgIcon.name);
  debugger;
  app.component(SvgIcon.name, SvgIcon);
}

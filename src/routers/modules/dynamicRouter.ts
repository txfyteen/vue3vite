import router from "@/routers";
import { isType } from "@/utils";
import { notFoundRouter } from "@/routers/modules/staticRouter";
import { ElNotification } from "element-plus";
import { useWebStore } from "@/store/modules/webStore";
import { useAuthStore } from "@/store/modules/authStore";
// 匹配某个文件夹下的所有 .js 文件：./path/*.js
// 匹配某个文件夹及其子文件夹下的所有 .vue 文件：./path/**/*.vue
// 排除某个文件夹下的某个文件：./path/!(*.md)
const modules = import.meta.glob("@/views/**/*.vue");

/**
 * 初始化动态路由
 */
export const initDynamicRouter = async () => {
  const webStore = useWebStore();
  const authStore = useAuthStore();
  try {
    await authStore.getAuthButtonList();
    await authStore.getAuthMenuList();
  } catch (e) {
    console.log(e);
  }

  // 判断当前用户是否有菜单权限
  if (!authStore.menuListGet.length) {
    ElNotification({
      title: "无权限访问",
      message: "当前账号无任何菜单权限，请联系系统管理员！",
      type: "warning",
      duration: 3000,
    });
    webStore.setToken("");
    router.replace("login");
    return Promise.reject("No permission");
  }
  // 有权限，添加动态路由， 路由扁平化
  authStore.flatMenuListGet.forEach((item: any) => {
    item.children && delete item.children;
    if (item.component && isType(item.component) === "string") {
      const componentUrl = "/src/views" + item.component + ".vue";
      console.log(componentUrl);
      console.log(modules[componentUrl]);
      item.component = modules[componentUrl];
    }
    if (item.meta.isFull) {
      router.addRoute(item);
    } else {
      router.addRoute("layout", item);
    }
  });
  // 最后添加找不到的路由
  router.addRoute(notFoundRouter);
};

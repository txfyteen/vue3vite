import { defineStore } from "pinia";
import { type RouteRecordRaw } from "vue-router";
import asyncRouteSettings from "@/routers/asyncRouteConfig";
import { constantRoutes, asyncRoutes } from "@/routers";
import { filterAsyncRoutes } from "@/utils/permission";

export const usePermissionStore = defineStore({
  id: "permission",
  // 想要对router做类型约束的话，需要对state做整体的约束
  // state这里面是直接赋值了，    routes: RouteRecordRaw[],
  state: () => ({
    routes: [] as RouteRecordRaw[],
    dynamicRoutes: [] as RouteRecordRaw[],
  }),
  getters: {
    routesGet: (state) => state.routes,
  },
  actions: {
    setRoutes(roles: string[]) {
      let accessedRoutes = [];
      // 是否开启动态路由,没有开启就是所用角色共用相同的页面
      if (!asyncRouteSettings.open) {
        accessedRoutes = asyncRoutes;
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles);
      }
      // 静态路由拼接动态路由
      this.routes = constantRoutes.concat(accessedRoutes);
      this.dynamicRoutes = accessedRoutes;
    },
  },
});

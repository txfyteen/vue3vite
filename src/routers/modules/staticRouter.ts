import { RouteRecordRaw } from "vue-router";
export const staticRouter: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "login",
    component: async () => await import("@/views/login/index.vue"),
    meta: {
      title: "登录页",
    },
  },
  {
    path: "/layout",
    name: "layout",
    component: async () => await import("@/layouts/index.vue"),
    redirect: "/",
    children: [],
  },
];

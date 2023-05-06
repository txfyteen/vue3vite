import { defineStore } from "pinia";
import {
  filterBlockMenu,
  getAllBreadcrumbList,
  getFlatArr,
} from "@/utils/index";
import { getMenuList, getAuthButtonList } from "@/api/modules/auth";

type MapObject = {
  [key: string]: string[];
};
export const useAuthStore = defineStore({
  id: "authStore",
  // 法二： 声明的时候就约束类型，不存在的类型可以使用type定义
  state: () => ({
    // 当前页面的router name ,用来做权限筛选
    routeName: "" as string,
    // 按钮权限列表
    authButtonList: {} as MapObject,
    // 菜单权限按钮
    authMenuList: [] as Menu.MenuOptions[],
  }),
  getters: {
    authButtonListGet: (state) => state.authButtonList,
    // 后台返回的菜单列表,选择在左侧菜单,没有经过任何处理
    menuListGet: (state) => state.authMenuList,
    // 后端返回的菜单列表 ==> 左侧菜单栏渲染，需要去除 isHide == true
    // 过滤出没有隐藏的菜单栏
    blockMenuListGet: (state) => filterBlockMenu(state.authMenuList),
    // 获取面包屑导航列表
    breadcrumbListGet: (state) => getAllBreadcrumbList(state.authMenuList),
    // 扁平化之后的一维数组路由，主要用来添加动态路由
    flatMenuListGet: (state) => getFlatArr(state.authMenuList),
  },
  actions: {
    async getAuthButtonList() {
      const { data } = await getAuthButtonList();
      this.authButtonList = data;
    },
    async getAuthMenuList() {
      const { data } = await getMenuList();
      this.authMenuList = data;

    },
    setRouteName(name: string) {
      this.routeName = name;
    },
  },
});

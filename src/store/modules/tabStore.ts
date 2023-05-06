import { defineStore } from "pinia";
import router from "@/routers";
export interface TabsMenuProps {
  icon: string;
  title: string;
  path: string;
  name: string;
  close: boolean;
}

export interface TabsState {
  tabsMenuList: TabsMenuProps[];
}
export const useTabStore = defineStore({
  id: "tabStore",
  state: () => ({
    // 赋值的时候给他做类型断言
    tabsMenuList: [] as TabsMenuProps[],
  }),
  actions: {
    // add Tabs 触发的菜单是左侧菜单栏
    async addTabs(tabItem: TabsMenuProps) {
      if (this.tabsMenuList.every((item) => item.path !== tabItem.path)) {
        this.tabsMenuList.push(tabItem);
      }
    },
    // 需要判断是否是当前的tab值
    async removeTabs(tabPath: string, isCurrent = true) {
      const tabsMenuList = this.tabsMenuList;
      if (isCurrent) {
        tabsMenuList.forEach((item, index) => {
          if (item.path !== tabPath) return;
          const nextTab = tabsMenuList[index + 1] || tabsMenuList[index - 1];
          if (!nextTab) return;
          router.push(nextTab.path);
        });
      }
      this.tabsMenuList = tabsMenuList.filter((item) => item.path !== tabPath);
    },

    // 关闭重复的tab
    async closeMultipleTab(tabsMenuValue?: string) {
      debugger;
      // 当前的路由并且不能关闭的
      this.tabsMenuList = this.tabsMenuList.filter((item) => {
        return item.path === tabsMenuValue || !item.close;
      });
    },
    // 设置tabs 列表
    async setTabs(tabsMenuList: TabsMenuProps[]) {
      this.tabsMenuList = tabsMenuList;
    },
    // 设置tab标题头
    async setTabsTitle(title: string) {
      const nowFullPath = location.hash.substring(1);
      this.tabsMenuList.forEach((item) => {
        if (item.path == nowFullPath) item.title = title;
      });
    },
  },
});

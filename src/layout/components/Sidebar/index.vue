<template>
  <el-aside class="sidebar" :style="{ width: isCollapse ? '65px' : '210px' }">
    <sidebar-logo />
    <div :class="{ 'has-logo': showSidebarLogo }">
      <!--    <sidebar-logo v-if="showSidebarLogo" :collapse="isCollapse" />-->
      <el-scrollbar wrap-class="scrollbar-wrapper">
        <el-menu
          :default-active="activeMenu"
          :collapse="isCollapse"
          :background-color="sidebarMenuBgColor"
          :text-color="sidebarMenuTextColor"
          :active-text-color="sidebarMenuActiveTextColor"
          :unique-opened="true"
          :collapse-transition="false"
          mode="vertical"
        >
          <sub-menu :menuList="menuList" />
        </el-menu>
      </el-scrollbar>
    </div>
  </el-aside>
</template>
<script setup lang="ts">
import { getCssVariableValue } from "@/utils";
import { useSettingStore } from "@/store/modules/settingStore";
// 可以利用从pinia中引用的storeToRefs方法，进行解构赋值，结构出来依然具有响应式
import { storeToRefs } from "pinia";
import { useWebStore } from "@/store/modules/webStore";
import { computed } from "vue";
import SidebarLogo from "./SidebarLogo.vue";
import { useRoute } from "vue-router";
import SubMenu from "./SubMenu.vue";
import { useAuthStore } from "@/store/modules/authStore";
const sidebarMenuBgColor = getCssVariableValue("--sidebar-menu-bg-color");
const sidebarMenuTextColor = getCssVariableValue("--sidebar-menu-text-color");
const sidebarMenuActiveTextColor = getCssVariableValue(
  "--sidebar-menu-active-text-color"
);
const settingStore = useSettingStore();
const webStore = useWebStore();
const authStore = useAuthStore();
const route = useRoute();
// computed getter 或者state的数据出来
const menuList = computed(() => authStore.blockMenuListGet);
// 如果是多层结构，用冒号分隔开,获取store值的两种方式，获取全部就用storeToRefs。获取单独一个就用computed
const { settingConfig: showSidebarLogo } = storeToRefs(settingStore);

const isCollapse = computed(() => {
  return !webStore.sidebar.opened;
});
/**当前激活的菜单*/
const activeMenu = computed(() => {
  const { meta, path } = route;
  if (meta?.activeMenu) {
    return meta.activeMenu;
  }
  return path;
});
</script>
<style lang="scss" scoped>
:deep(.el-menu) {
  border: none;
}
</style>

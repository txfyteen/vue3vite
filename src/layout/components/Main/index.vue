<template>
  <tabs />
  <el-main>
    <router-view v-slot="{ Component, route }">
      <transition appear name="fade-transform" mode="out-in">
        <keep-alive :include="keepAliveName">
          <component :is="Component" :key="route.path" v-if="isRouterShow" />
        </keep-alive>
      </transition>
    </router-view>
  </el-main>
  <el-footer v-if="themeConfig.footer">
    <Footer />
  </el-footer>
</template>
<script setup lang="ts">
import Tabs from "./components/Tabs.vue";
import { useDebounceFn } from "@vueuse/core";
import { useKeepAliveStore } from "@/store/modules/KeepAliveStore";
import { computed, provide, ref, watch, onBeforeUnmount } from "vue";
import { ThemeConfigProps, useWebStore } from "@/store/modules/webStore";
import Footer from "@/layout/components/Footer/index.vue";

// 方法二：解构出keepName
const { keepAliveName } = useKeepAliveStore();

const webStore = useWebStore();
const themeConfig = computed((): ThemeConfigProps => webStore.themeConfig);
const isCollapse = computed(() => webStore.themeConfig.isCollapse);

const isRouterShow = ref(true);
const refreshCurrentPage = (val: boolean) => (isRouterShow.value = val);
provide("refresh", refreshCurrentPage);

// 监听当前页是否最大化，动态添加 class
watch(
  () => themeConfig.value.maximize,
  () => {
    const app = document.getElementById("app") as HTMLElement;
    if (themeConfig.value.maximize) app.classList.add("main-maximize");
    else app.classList.remove("main-maximize");
  },
  { immediate: true }
);

// 监听窗口大小变化，折叠侧边栏
const screenWidth = ref(0);
const listeningWindow = useDebounceFn(() => {
  screenWidth.value = document.body.clientWidth;
  if (!isCollapse.value && screenWidth.value < 1200)
    webStore.setThemeConfig({ ...themeConfig.value, isCollapse: true });
  if (isCollapse.value && screenWidth.value > 1200)
    webStore.setThemeConfig({ ...themeConfig.value, isCollapse: false });
}, 100);
window.addEventListener("resize", listeningWindow, false);
onBeforeUnmount(() => {
  window.removeEventListener("resize", listeningWindow);
});
</script>
<style lang="scss">
.el-main {
  box-sizing: border-box;
  padding: 10px 12px;
  overflow: hidden;
  background-color: #f0f2f5;
  &::-webkit-scrollbar {
    background-color: #f0f2f5;
  }
}
.el-footer {
  height: auto;
  padding: 0;
}
</style>

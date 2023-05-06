<template>
  <div :class="['breadcrumb-box', !breadcrumbIcon && 'no-icon']">
    <el-breadcrumb :separator-icon="ArrowRight">
      <transition-group name="breadcrumb" mode="out-in">
        <el-breadcrumb-item
          v-for="(item, index) in breadcrumbList"
          :key="item.path"
        >
          <div
            class="el-breadcrumb__inner is-light"
            @click="onBreadcrumbClick(item, index)"
          >
            <el-icon
              class="breadcrumb-icon"
              v-show="item.meta.icon && breadcrumbIcon"
            >
              <component :is="item.meta.icon"></component>
            </el-icon>
            <span class="breadcrumb-title">{{ item.meta.title }}</span>
          </div>
        </el-breadcrumb-item>
      </transition-group>
    </el-breadcrumb>
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { useWebStore } from "@/store/modules/webStore";
import { ArrowRight } from "@element-plus/icons-vue";
import { useAuthStore } from "@/store/modules/authStore";
import { useRouter, useRoute } from "vue-router";
const webStore = useWebStore();
const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const breadcrumbIcon = computed(() => webStore.navigationBar.breadcrumbIcon);

const breadcrumbList = computed(() => {
  console.log(route.matched[route.matched.length - 1].path);
  // 存储的时候是以key value的形式存储
  let breadcrumbData =
    authStore.breadcrumbListGet[route.matched[route.matched.length - 1].path] ??
    [];
  // 获取路由经过的数组
  console.log(breadcrumbData);
  // 不需要首页面包屑可删除以下判断
  if (breadcrumbData[0].meta.title !== route.meta.title) {
    breadcrumbData = [
      { path: "/", meta: { icon: "HomeFilled", title: "首页" } },
      ...breadcrumbData,
    ];
  }
  return breadcrumbData;
});

const onBreadcrumbClick = (item: Menu.MenuOptions, index: number) => {
  if (index !== breadcrumbList.value.length - 1) router.push(item.path);
};
</script>
<style lang="scss">
.el-breadcrumb__inner,
.el-breadcrumb__inner.is-link {
  color: #606266;
  &:hover {
    cursor: pointer;
    color: var(--el-color-primary);
  }
}
.el-breadcrumb__item:last-child .el-breadcrumb__inner,
.el-breadcrumb__item:last-child .el-breadcrumb__inner:hover {
  color: #606266;
}
</style>

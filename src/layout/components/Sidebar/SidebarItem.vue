<template>
  <div
    v-if="!props.item.meta?.hidden"
    :class="{
      'simple-mode': props.isCollapse,
      'root-menu': props.isRoot,
    }"
  >
    <!--    onlyOneChild 只有一个儿子的情况-->
    <template v-if="onlyOneChild && !onlyOneChild.children">
      <!--      用一个超连接标签把内容包裹起来-->
      <sidebar-item-link
        v-if="onlyOneChild.meta"
        :to="resolvePath(onlyOneChild.path)"
      >
        <el-menu-item :index="resolvePath(onlyOneChild.path)">
          <svg-icon
            v-if="onlyOneChild.meta.svgIcon"
            :name="onlyOneChild.meta.svgIcon"
          />
          <component
            v-else-if="onlyOneChild.meta.elIcon"
            :is="onlyOneChild.meta.elIcon"
            class="el-icon"
          />
          <template v-if="onlyOneChild.meta.title" #title>
            {{ onlyOneChild.meta }}
          </template>
        </el-menu-item>
      </sidebar-item-link>
    </template>

    <!--    如果是有子菜单的情况-->
    <el-sub-menu v-else :index="resolvePath(props.item.path)" teleported>
      <template #title>
        <svg-icon
          v-if="props.item.meta && props.item.meta.svgIcon"
          :name="props.item.meta.svgIcon"
        ></svg-icon>
        <component
          v-else-if="props.item.meta && props.item.meta.elIcon"
          :is="props.item.meta.elIcon"
          class="el-icon"
        />
        <span v-if="props.item && props.item.meta?.title">{{
          props.item.meta?.title
        }}</span>
      </template>
      <template v-if="props.item.children">
        <sidebar-item
          :item="child"
          :key="child.path"
          :is-collapse="props.isCollapse"
          :is-root="false"
          :base-path="resolvePath(child.path)"
          v-for="child in props.item.children"
        ></sidebar-item>
      </template>
    </el-sub-menu>
  </div>
</template>
<script setup lang="ts">
import { type PropType, computed } from "vue";
import { type RouteRecordRaw } from "vue-router";
import { isExternal } from "@/utils/validate";
import path from "path-browserify";
import SidebarItemLink from "./SidebarItemLink.vue";

const props = defineProps({
  item: {
    type: Object as PropType<RouteRecordRaw>,
    required: true,
  },
  isCollapse: {
    type: Boolean,
    default: false,
  },
  basePath: {
    type: String,
    default: "",
  },
  isRoot: {
    type: Boolean,
    default: true,
  },
});


const showChildNumber = computed(() => {
  debugger;
  if (props.item.children) {
    // 过滤出没有隐藏的子菜单
    const showChildren = props.item.children.filter((item) => {
      return !(item.meta && item.meta.hidden);
    });
    return showChildren.length;
  }
  return 0;
});

const onlyOneChild = computed(() => {
  debugger;
  if (showChildNumber.value > 1) {
    return null;
  }
  // 如果有儿子，并且没有隐藏的情况下，返回当前儿子，进行过滤计算
  if (props.item.children) {
    // 只有一个儿子，通过for of 取出来
    for (const child of props.item.children) {
      if (child.meta && !child.meta.hidden) {
        return child;
      }
    }
  }
  // If there is no children, return itself with path removed,
  // because this.basePath already contains item's path information
  return { ...props.item, path: "" };
});

const resolvePath = (routePath: string) => {
  if (isExternal(routePath)) {
    return routePath;
  }
  if (isExternal(props.basePath)) {
    return props.basePath;
  }
  return path.resolve(props.basePath, routePath);
};
</script>
<style lang="scss" scoped></style>

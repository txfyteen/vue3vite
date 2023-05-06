<template>
  <component :is="LayoutComponents[themeConfig.layout]"></component>
</template>
<script lang="ts" setup>
import { type Component, computed } from "vue";
import { ThemeConfigProps, useWebStore } from "@/store/modules/webStore";
import LayoutClassic from "./components/LayoutClassic/index.vue";
import LayoutVertical from "./components/LayoutVertical/index.vue";
import { LayoutType } from "@/store/modules/webStore";
const webStore = useWebStore();

const LayoutComponents: { [key: string]: Component } = {
  [LayoutType.Vertical]: LayoutVertical,
  [LayoutType.Classic]: LayoutClassic,
};

const themeConfig = computed((): ThemeConfigProps => webStore.themeConfig);
</script>

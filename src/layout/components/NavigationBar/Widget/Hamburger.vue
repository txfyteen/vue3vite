<template>
  <el-icon class="collapse-icon" @click="onCollapseClick">
    <component :is="collapse ? 'expand' : 'fold'" />
  </el-icon>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { useWebStore } from "@/store/modules/webStore";
const webStore = useWebStore();
const collapse = computed(() => webStore.sidebar.opened);
const onCollapseClick = () => {
  webStore.toggleSidebar(true);
};
</script>
<style lang="scss" scoped>
.collapse-icon {
  margin-right: 20px;
  font-size: 22px;
  cursor: pointer;
}
</style>

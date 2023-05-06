<template>
  <el-dropdown trigger="click" @command="setAssemblySize">
    <i :class="'iconfont icon-bujufangshi'" class="toolBar-icon"></i>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="item in assemblySizeList"
          :key="item"
          :disabled="assemblySize == item"
          :command="item"
        >
          {{ assemblySizeListCh[item] }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<script setup lang="ts">
import { AssemblySizeType, useWebStore } from "@/store/modules/webStore";
import { storeToRefs } from "pinia";
import { reactive } from "vue";

const webStore = useWebStore();
const { assemblySize } = storeToRefs(webStore);
const assemblySizeList: AssemblySizeType[] = [
  AssemblySizeType.Default,
  AssemblySizeType.Small,
  AssemblySizeType.Large,
];

const assemblySizeListCh = reactive<{ [key: number]: string }>({
  [AssemblySizeType.Default]: "默认",
  [AssemblySizeType.Small]: "小型",
  [AssemblySizeType.Large]: "大型",
});

const setAssemblySize = (item: AssemblySizeType) => {
  webStore.setAssemblySizeSize(item);
};
</script>
<style lang="scss" scoped></style>

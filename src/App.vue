<template>
  <el-config-provider :button="config">
    <router-view></router-view>
  </el-config-provider>
</template>

<script setup lang="ts">
import { reactive } from "vue";

const config = reactive({
  autoInsertSpace: false,
});
</script>

<style lang="scss" scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
</style>

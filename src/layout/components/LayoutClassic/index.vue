<template>
  <el-container class="layout">
    <el-header>

    </el-header>
    <el-container class="classic-content">
      <el-aside>
        <sidebar />
      </el-aside>
      <el-main>
        <main />
      </el-main>
    </el-container>
  </el-container>
</template>
<script setup lang="ts" name="LayoutClassic">
import Sidebar from "../Sidebar/index.vue";
import Main from "../../components/Main/index.vue";
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>

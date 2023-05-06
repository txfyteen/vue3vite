<template>
  <el-container class="layout">
    <sidebar />
    <el-container>
      <el-header>
        <!--  左侧导航栏-->
        <nav-left />
        <!--  右侧导航栏-->
        <nav-right />
      </el-header>
      <Main />
    </el-container>
  </el-container>
</template>
<script setup lang="ts" name="LayoutVertical">
import Sidebar from "../Sidebar/index.vue";
import Main from "../../components/Main/index.vue";
import NavLeft from "../../components/NavigationBar/NavLeft.vue";
import NavRight from "../../components/NavigationBar/NavRight.vue";
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>

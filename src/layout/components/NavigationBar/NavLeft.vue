<template>
  <div class="nav-bar-left">
    <!--  展开关闭按钮-->
    <hamburger />
    <!--  面包屑导航-->
    <breadcrumb />
  </div>
</template>
<script setup lang="ts">
import Hamburger from "./Widget/Hamburger.vue";
import Breadcrumb from "./Widget/Breadcrumb.vue";
</script>
<style lang="scss" scoped>
.nav-bar-left {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  white-space: nowrap;

}
</style>

<template>
  <div class="nav-bar-right">
    <div class="header-icon">
      <assembly-size />
      <full-screen />
      <message />
      <search-menu />
      <profile />
    </div>
  </div>
</template>
<script setup lang="ts">
import AssemblySize from "./Widget/AssemblySize.vue";
import FullScreen from "./Widget/FullScreen.vue";
import Message from "./Widget/Message.vue";
import SearchMenu from "./Widget/SearchMenu.vue";
import Profile from "./Widget/Profile.vue";
</script>
<style lang="scss" scoped>
.nav-bar-right,
.header-icon {
  display: flex;
  align-items: center;
}
.header-icon > * {
  margin-left: 20px;
}
</style>

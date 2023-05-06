<template>
  <div class="sidebar-logo-container" :class="{ collapse: collapse }">
    <transition name="sidebar-logo-fade">
      <router-link key="expand" to="/" class="sidebar-logo-wrapper">
        <img src="../../../assets/layout/logo.png" class="sidebar-logo" />
        <span v-show="collapse">admin管理后台</span>
      </router-link>
    </transition>
  </div>
</template>
<script setup lang="ts">
import { useWebStore } from "@/store/modules/webStore";
import { computed } from "vue";
const webStore = useWebStore();
const collapse = computed(() => webStore.sidebar.opened);
</script>
<style lang="scss" scoped>
.sidebar-logo-wrapper {
  display: flex;
  align-items: center;
  font-size: 20px;
  color: white;
  text-decoration: none;
  padding-right: 15px;
}
.sidebar-logo {
  width: 40px;
  margin-right: 5px;
}

.sidebar-logo-text {
  width: 150px;
}
</style>

<template>
  <div class="login-container">
    <div class="login-box">
      <div class="login-form">
        <div class="login-logo">
          <img class="login-icon" src="@/assets/images/logo.svg" alt="" />
          <h2 class="logo-text">Geeker-Admin</h2>
        </div>
        <login-form />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="login">
import LoginForm from "./components/LoginForm.vue";
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>

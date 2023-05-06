<template>
  <el-dropdown trigger="click" @command="handleLanguage">
    <i :class="'iconfont icon-zhongyingwen'" class="toolBar-icon"></i>
    <template #dropdown>
      <el-dropdown-menu :disabled="language && language == 'zh'" command="zh"
        >简体中文</el-dropdown-menu
      >
      <el-dropdown-menu :disabled="language == 'en'" command="en"
        >English</el-dropdown-menu
      >
    </template>
  </el-dropdown>
</template>
<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useWebStore } from "@/store/modules/webStore";
import { computed, onMounted } from "vue";
import { getBrowserLang } from "@/utils";
const i18n = useI18n();
const webStore = useWebStore();
//  通过computed 直接从拿出数据
const language = computed(() => webStore.language);
// 切换语言并且保存起来
const handleLanguage = (lang: string) => {
  i18n.locale.value = lang;
  webStore.language = lang;
};
// 一进入主页就初始化页面
onMounted(() => {
  handleLanguage(language.value || getBrowserLang());
});
</script>
<style lang="scss" scoped></style>

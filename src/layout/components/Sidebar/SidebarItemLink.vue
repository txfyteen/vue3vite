<template>
  <!--  如果是全路径-->
  <a
    v-if="isExternal(props.to)"
    :href="props.to"
    target="_blank"
    rel="noOpener"
  ></a>

  <router-link v-else :to="props.to">
    <slot />
  </router-link>
</template>
<script setup lang="ts">
import { isExternal } from "@/utils/validate";
const props = defineProps({
  to: {
    type: String,
    required: true,
  },
});
</script>
<style lang="scss" scoped></style>

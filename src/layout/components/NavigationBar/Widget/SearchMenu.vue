<template>
  <div class="search-container">
    <i @click="handleOpen" class="iconfont icon-sousuo toolBar-icon"></i>
    <el-dialog
      v-model="searchDialogVisible"
      destroy-on-close
      :modal="false"
      center
      :show-close="false"
      fullscreen
      @click="closeSearch"
    >
      <el-autocomplete
        v-model="searchMenu"
        ref="menuInputRef"
        placeholder="菜单搜索：支持菜单名称和路径"
        :fetch-suggestions="searchMenuList"
        @select="handleSelectMenu"
      >
        <template #prefix>
          <el-icon>
            <Search />
          </el-icon>
        </template>
        <template #default="{ item }">
          <el-icon>
            <component :is="item.meta.icon"></component>
          </el-icon>
          <span> {{ item.meta.title }} </span>
        </template>
      </el-autocomplete>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import { computed, ref, nextTick } from "vue";
import { Search } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/store/modules/authStore";
const router = useRouter();
const authStore = useAuthStore();
const menuList = computed(() =>
  authStore.flatMenuListGet.filter((item) => !item.meta.isHide)
);
// 大概的意思就是说：不要使用 Function 类型作为参数的类型，因为一些函数的返回是不安全的，不知道函数会返回什么内容
//函数需要定义类型：error  Don't use `Function` as a type. The `Function` type accepts any function-like value.

const searchMenuList = (
  queryString: string,
  cb: (menu: Menu.MenuOptions[]) => void
) => {
  const result = queryString
    ? menuList.value.filter(filterNodeMethod(queryString))
    : menuList.value;
  cb(result);
};

// 搜索窗关闭
const closeSearch = () => {
  searchDialogVisible.value = false;
};

// 筛选菜单
const filterNodeMethod = (queryString: string) => {
  return (restaurant: Menu.MenuOptions) => {
    return (
      restaurant.path.toLowerCase().indexOf(queryString.toLowerCase()) > -1 ||
      restaurant.meta.title.toLowerCase().indexOf(queryString.toLowerCase()) >
        -1
    );
  };
};
const searchDialogVisible = ref(false);
const menuInputRef = ref();
const searchMenu = ref("");
const handleOpen = () => {
  searchDialogVisible.value = true;
  searchMenu.value = "";
  nextTick(() => {
    setTimeout(() => {
      menuInputRef.value.focus();
    });
  });
};
// 处理打开选中的menu
const handleSelectMenu = (menuItem: Menu.MenuOptions) => {
  searchMenu.value = "";
  if (menuItem.meta.isLink) window.open(menuItem.meta.isLink, "_blank");
  else router.push(menuItem.path);
  closeSearch();
};
</script>
<style lang="scss" scoped>
.search-container {
  :deep(.el-dialog) {
    background: rgba(0, 0, 0, 0.5);
  }
  :deep(.el-dialog__header) {
    border: 0;
  }

  :deep(.el-autocomplete) {
    position: absolute;
    top: 10%;
    left: 50%;
    width: 550px;
    transform: translateX(-50%);
  }
}
</style>

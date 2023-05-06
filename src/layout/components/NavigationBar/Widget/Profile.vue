<template>
  <div class="profile-main">
    <span class="user-name">晓红</span>
    <el-dropdown trigger="click">
      <div class="avatar">
        <img src="@/assets/images/avatar.gif" />
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="openDialog('infoRef')">
            <el-icon><User /></el-icon>{{ $t("header.personalData") }}
          </el-dropdown-item>
          <el-dropdown-item @click="openDialog('passwordRef')">
            <el-icon><Edit /></el-icon>{{ $t("header.changePassword") }}
          </el-dropdown-item>
          <el-dropdown-item @click="logout" divided>
            <el-icon><SwitchButton /></el-icon>{{ $t("header.logout") }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useWebStore } from "@/store/modules/webStore";
import { useRouter } from "vue-router";
import { ElMessageBox, ElMessage } from "element-plus";
import { LOGIN_URL } from "@/constants/configConst";

const router = useRouter();
const webStore = useWebStore();
const logout = () => {
  ElMessageBox.confirm("您是否确认退出登录?", "温馨提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(async () => {
    // 1.调用退出登录接口
    // await logoutApi();
    // 2.清除 Token
    webStore.setToken("");
    // 3.重定向到登陆页
    router.replace(LOGIN_URL);
    ElMessage.success("退出登录成功！");
  });
};

interface DialogExpose {
  openDialog: () => void;
}
const infoRef = ref<null | DialogExpose>(null);
const passwordRef = ref<null | DialogExpose>(null);
// 打开修改密码和个人信息弹窗
const openDialog = (refName: string) => {
  if (refName == "infoRef") infoRef.value?.openDialog();
  else passwordRef.value?.openDialog();
};
</script>
<style lang="scss" scoped>
.profile-main {
  display: flex;
  align-items: center;
}
.user-name {

  margin-right: 20px;
  &:hover {
    cursor: pointer;
  }
}
.avatar {
  width: 40px;
  height: 40px;
  overflow: hidden;
  cursor: pointer;
  border-radius: 50%;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>

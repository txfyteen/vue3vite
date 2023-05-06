<template>
  <el-form
    ref="ruleFormRef"
    label-width="100px"
    label-suffix=" :"
    :rules="rules"
    :disabled="dialogProps.isView"
    :model="dialogProps.row"
    :hide-required-asterisk="dialogProps.isView"
  >
    <el-form-item label="用户头像" prop="avatar">
      <UploadImg
        v-model:image-url="dialogProps.row!.avatar"
        width="135px"
        height="135px"
        :file-size="3"
      >
        <template #empty>
          <el-icon><Avatar /></el-icon>
          <span>请上传头像</span>
        </template>
        <template #tip> 头像大小不能超过 3M </template>
      </UploadImg>
    </el-form-item>
    <el-form-item label="多图照片" prop="photo">
      <UploadImgs
        v-model:file-list="dialogProps.row!.photo"
        height="140px"
        width="140px"
        border-radius="50%"
      >
        <template #empty>
          <el-icon><Picture /></el-icon>
          <span>请上传照片</span>
        </template>
        <template #tip> 照片大小不能超过 5M </template>
      </UploadImgs>
    </el-form-item>
    <el-form-item label="用户姓名" prop="username">
      <el-input
        v-model="dialogProps.row!.username"
        placeholder="请填写用户姓名"
        clearable
      ></el-input>
    </el-form-item>
    <el-form-item label="性别" prop="gender">
      <el-select
        v-model="dialogProps.row!.gender"
        placeholder="请选择性别"
        clearable
      >
        <el-option
          v-for="item in genderType"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="身份证号" prop="idCard">
      <el-input
        v-model="dialogProps.row!.idCard"
        placeholder="请填写身份证号"
        clearable
      ></el-input>
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input
        v-model="dialogProps.row!.email"
        placeholder="请填写邮箱"
        clearable
      ></el-input>
    </el-form-item>
    <el-form-item label="居住地址" prop="address">
      <el-input
        v-model="dialogProps.row!.address"
        placeholder="请填写居住地址"
        clearable
      ></el-input>
    </el-form-item>
    <el-form-item class="footer-action">
      <el-button @click="handleClose">Cancel</el-button>
      <el-button type="primary" @click="handleSubmit">Create</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts" name="UserDrawer">
import { ref, reactive } from "vue";
import { genderType } from "@/utils/serviceDict";
import { ElMessage, FormInstance } from "element-plus";
import { addUser, editUser, User } from "@/api/modules/user";
import UploadImg from "@/components/Upload/Img.vue";
import UploadImgs from "@/components/Upload/Imgs.vue";
import { DialogProps } from "@/api/interface";
const emit = defineEmits(["closeDialog"]);

// vue3 尚不支持从外部引入类型定义
const dialogProps = ref<DialogProps>({
  isView: false,
  title: "",
  row: {},
});
const rules = reactive({
  avatar: [{ required: true, message: "请上传用户头像" }],
  photo: [{ required: true, message: "请上传用户照片" }],
  username: [{ required: true, message: "请填写用户姓名" }],
  gender: [{ required: true, message: "请选择性别" }],
  idCard: [{ required: true, message: "请填写身份证号" }],
  email: [{ required: true, message: "请填写邮箱" }],
  address: [{ required: true, message: "请填写居住地址" }],
});

const ruleFormRef = ref<FormInstance>();
const handleSubmit = () => {
  ruleFormRef.value!.validate(async (valid) => {
    if (!valid) return;
    try {
      debugger;
      dialogProps.value.title === "编辑"
        ? await editUser(dialogProps.value.row)
        : await addUser(dialogProps.value.row);
      ElMessage.success({ message: `${dialogProps.value.title}用户成功！` });
      dialogProps.value.getTableList!();
      emit("closeDialog");
    } catch (error) {
      console.log(error);
    }
  });
};

const handleClose = () => {
  emit("closeDialog", false);
};
/**
 *
 * @param type 编辑的类型
 * @param params 对应的行item
 */
const acceptParams = (type: string, params: User) => {
  dialogProps.value.title = type;
  dialogProps.value.row = params;
};

defineExpose({
  acceptParams,
});
</script>
<style lang="scss" scoped>
::v-deep(.el-select) {
  width: 100%;
}

.footer-action {
  ::v-deep(.el-form-item__content) {
    justify-content: flex-end;
  }
}
</style>

<template>
  <el-form
    ref="loginFormRef"
    :model="loginForm"
    :rules="loginRules"
    size="large"
  >
    <el-form-item label="用户名" prop="username">
      <el-input v-model="loginForm.username">
        <template #prefix>
          <el-icon class="el-input__icon"><user /></el-icon>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item label="用户名" prop="password">
      <el-input label="密码" v-model="loginForm.password" show-password>
        <template #prefix>
          <el-icon class="el-input__icon"><lock /></el-icon>
        </template>
      </el-input>
    </el-form-item>
  </el-form>

  <div class="login-btn">
    <el-button
      :icon="CircleClose"
      round
      @click="resetForm(loginFormRef)"
      size="large"
      >重置</el-button
    >
    <el-button
      :icon="UserFilled"
      round
      @click="login(loginFormRef)"
      size="large"
      type="primary"
      :loading="loading"
    >
      登录
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { loginApi } from "@/api/modules/auth";
import { CircleClose, UserFilled } from "@element-plus/icons-vue";
import { ElMessage, FormInstance } from "element-plus";
import { ref, reactive, toRefs } from "vue";
const loginFormRef = ref<FormInstance>();
const loginRules = reactive({
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
});
const state = reactive({
  loginForm: {
    username: "",
    password: "",
  },
  loading: false,
});

// 解构出来一层对象，他就能类型推断了，多层的话无法推断,能不能推断出来就看对象. 后面是否能出现属性名
// 解构出来是符合类型的
const { loginForm, loading } = toRefs(state);
const login = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async (valid) => {
    if (!valid) return;
    loading.value = true;
    try {
      //直接解构够来是一个响应式的类型，loginForm 直接loginForm是一个包装后的函数,需要通过.value取出来
      const { data, code } = await loginApi({ ...loginForm.value });

      if (code == 200) {
        ElMessage({
          message: "Congrats, this is a success message.",
          type: "success",
        });
        loading.value = false;
      }
    } finally {
    }
  });
};
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>

<style scoped></style>

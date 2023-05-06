<template>
  <pro-table
    ref="proTable"
    title="用户列表"
    :columns="columns"
    :request-api="getTableList"
    :init-param="initParam"
    :data-callback="dataCallback"
  >
    <!-- 表格 header 按钮 -->
    <template #tableHeader="scope">
      <el-button
        type="primary"
        :icon="CirclePlus"
        v-auth="'add'"
        @click="userDialog('新增')"
        >新增用户</el-button
      >
      <el-button type="primary" :icon="Upload" plain v-auth="'batchAdd'"
        >批量添加用户</el-button
      >
      <el-button type="primary" :icon="Download" plain v-auth="'export'"
        >导出用户数据</el-button
      >
      <el-button
        type="danger"
        :icon="Delete"
        plain
        :disabled="!scope.isSelected"
      >
        批量删除用户
      </el-button>
    </template>
    <!-- Expand -->
    <template #expand="scope">
      {{ scope.row }}
    </template>

    <!--    表格操作-->
    <template #operation="scope">
      <el-button
        type="primary"
        link
        :icon="View"
        @click="userDialog('查看', scope.row)"
        >查看</el-button
      >
      <el-button
        type="primary"
        link
        :icon="EditPen"
        @click="userDialog('编辑', scope.row)"
        >编辑</el-button
      >
      <el-button
        type="primary"
        link
        :icon="Refresh"
        @click="resetPass(scope.row)"
        >重置密码</el-button
      >
      <el-button
        type="primary"
        link
        :icon="Delete"
        @click="deleteAccount(scope.row)"
        >删除</el-button
      >
    </template>
  </pro-table>

  <el-dialog
    v-model="dialogVisible"
    center
    :destroy-on-close="true"
    :title="`${dialogProps.title}用户`"
  >
    <component
      :is="UserEdit"
      ref="dialogComponent"
      @closeDialog="dialogVisible = false"
    ></component>
  </el-dialog>
</template>
<script setup lang="tsx" name="useProTable">
import ProTable from "@/components/ProTable/index.vue";
import UserEdit from "../components/UserEdit.vue";
import { reactive, ref, nextTick } from "vue";
import { ColumnProps } from "@/components/ProTable/interface";
import { User } from "@/api/modules/user";
import { ElMessage } from "element-plus";
import { getUserList, deleteUser, resetUserPassWord } from "@/api/modules/user";
import { DialogProps } from "@/api/interface";
import {
  CirclePlus,
  Delete,
  EditPen,
  Download,
  Upload,
  View,
  Refresh,
} from "@element-plus/icons-vue";
import { useHandleData } from "@/hooks/useHandleData";
const dialogVisible = ref(false);
const dialogProps = ref<DialogProps>({
  isView: false,
  title: "",
  row: {},
});

// 获取 ProTable 元素，调用其获取刷新数据方法（还能获取到当前查询参数，方便导出携带参数）
const proTable = ref();
// 获取 dialog内容对应的ref
const dialogComponent = ref();
// 如果你想在请求之前对当前请求参数做一些操作，可以自定义如下函数：params 为当前所有的请求参数（包括分页），最后返回请求列表接口
// 默认不做操作就直接在 ProTable 组件上绑定	:requestApi="getUserList"
const getTableList = (params: any) => {
  let newParams = JSON.parse(JSON.stringify(params));
  newParams.username && (newParams.username = "custom-" + newParams.username);
  return getUserList(newParams);
};
// 如果表格需要初始化请求参数，直接定义传给 ProTable(之后每次请求都会自动带上该参数，此参数更改之后也会一直带上，改变此参数会自动刷新表格数据)
const initParam = reactive({ type: 1 });

// 页面按钮权限（按钮权限既可以使用 hooks，也可以直接使用 v-auth 指令，指令适合直接绑定在按钮上，hooks 适合根据按钮权限显示不同的内容）
const BUTTONS = ref({ status: 0 });
// 自定义渲染表头（使用tsx语法）
const headerRender = (row: ColumnProps) => {
  return (
    <el-button
      type="primary"
      onClick={() => {
        ElMessage.success("我是通过 tsx 语法渲染的表头");
      }}
    >
      {row.label}
    </el-button>
  );
};
// dataCallback 是对于返回的表格数据做处理，如果你后台返回的数据不是 list && total && pageNum && pageSize 这些字段，那么你可以在这里进行处理成这些字段
// 或者直接去 hooks/useTable.ts 文件中把字段改为你后端对应的就行
const dataCallback = (data: any) => {
  return {
    list: data.list,
    total: data.total,
    pageNum: data.pageNum,
    pageSize: data.pageSize,
  };
};
// 切换用户状态
const changeStatus = async (row: User) => {
  console.log(row);
};
// 渲染表头
const columns: ColumnProps<User>[] = [
  {
    // 类型
    type: "selection",
    fixed: "left",
    width: 80,
  },
  { type: "index", label: "#", width: 80 },
  { type: "expand", label: "Expand", width: 100 },
  {
    prop: "username",
    label: "用户姓名",
    search: { el: "input" },
    render: (scope) => {
      return (
        <el-button
          type="primary"
          link
          onClick={() => ElMessage.success("我是通过 tsx 语法渲染的内容")}
        >
          {scope.row.username}
        </el-button>
      );
    },
  },
  {
    prop: "gender",
    label: "性别",
    // 字典数据
    // enum: genderType,
    // 字典请求不带参数
    // 字典请求携带参数
    // enum: () => getUserGender({ id: 1 }),
    search: { el: "select", props: { filterable: true } },
    fieldNames: { label: "genderLabel", value: "genderValue" },
  },
  // 多级 prop
  { prop: "user.detail.age", label: "年龄", search: { el: "input" } },
  { prop: "idCard", label: "身份证号", search: { el: "input" } },
  { prop: "email", label: "邮箱" },
  { prop: "address", label: "居住地址" },
  {
    prop: "status",
    label: "用户状态",
    search: { el: "tree-select", props: { filterable: true } },
    fieldNames: { label: "userLabel", value: "userStatus" },
    render: (scope) => {
      return (
        <>
          {BUTTONS.value.status ? (
            <el-switch
              model-value={scope.row.status}
              active-text={scope.row.status ? "启用" : "禁用"}
              active-value={1}
              inactive-value={0}
              onClick={() => changeStatus(scope.row)}
            />
          ) : (
            <el-tag type={scope.row.status ? "success" : "danger"}>
              {scope.row.status ? "启用" : "禁用"}
            </el-tag>
          )}
        </>
      );
    },
  },
  {
    prop: "createTime",
    label: "创建时间",
    headerRender,
    width: 180,
    search: {
      el: "date-picker",
      span: 2,
      props: { type: "datetimerange", valueFormat: "YYYY-MM-DD HH:mm:ss" },
      defaultValue: ["2022-11-12 11:35:00", "2022-12-12 11:35:00"],
    },
  },
  { prop: "operation", label: "操作", fixed: "right", width: 330 },
];

const deleteAccount = async (params: User) => {
  await useHandleData(
    deleteUser,
    { id: params.id },
    `删除[${params.username}]用户`
  );
  // 调用table的刷新方法
  proTable.value.getTableList();
};
const resetPass = async (params: User) => {
  await useHandleData(
    resetUserPassWord,
    { id: params.id },
    `重置【${params.username}】用户密码`
  );
};

const userDialog = (typeStr: string, row: User) => {
  console.log(typeStr, row);
  dialogVisible.value = true;
  if (row) {
    nextTick(() => {
      dialogComponent.value?.acceptParams(typeStr, row);
    });
  }
};
</script>

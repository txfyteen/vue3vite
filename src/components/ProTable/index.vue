<template>
  <!--  表格内容-->
  <div class="card table-main">
    <div class="table-header">
      <div class="header-button-lf">
        <slot
          name="tableHeader"
          :selectedIds="selectedIds"
          :selectedList="selectedList"
          :isSelected="isSelected"
        ></slot>
      </div>

      <div class="header-button-ri" v-if="toolButton">
        <slot name="toolButton">
          <el-button :icon="Refresh" circle />
          <el-button :icon="Operation" circle v-if="columns.length" />
          <el-button
            :icon="Search"
            circle
            @click="isShowSearch = !isShowSearch"
          />
        </slot>
      </div>
    </div>

    <!-- 表格主体 -->
    <el-table
      ref="tableRef"
      v-bind="$attrs"
      :data="tableData"
      :border="border"
      :row-key="rowKey"
      @selection-change="selectionChange"
    >
      <!-- 默认插槽 -->
      <slot></slot>
      <template v-for="item in tableColumns" :key="item">
        <!-- selection || index -->
        <el-table-column
          v-bind="item"
          :align="item.align ?? 'center'"
          :reserve-selection="item.type == 'selection'"
          v-if="item.type == 'selection' || item.type == 'index'"
        >
        </el-table-column>
        <!-- expand 支持 tsx 语法 && 作用域插槽 (tsx > slot) -->
        <el-table-column
          v-bind="item"
          :align="item.align ?? 'center'"
          v-if="item.type == 'expand'"
          v-slot="scope"
        >
          <component :is="item.render" v-bind="scope" v-if="item.render">
          </component>
          <slot :name="item.type" v-bind="scope" v-else></slot>
        </el-table-column>
        <!-- other 循环递归 -->
        <TableColumn
          v-if="!item.type && item.prop && item.isShow"
          :column="item"
        >
          <template v-for="slot in Object.keys($slots)" #[slot]="scope">
            <slot :name="slot" v-bind="scope"></slot>
          </template>
        </TableColumn>
      </template>
      <!-- 插入表格最后一行之后的插槽 -->
      <template #append>
        <slot name="append"> </slot>
      </template>
      <!-- 表格无数据情况 -->
      <template #empty>
        <div class="table-empty">
          <slot name="empty">
            <img src="@/assets/images/notData.png" alt="notData" />
            <div>暂无数据</div>
          </slot>
        </div>
      </template>
    </el-table>

    <pagination
      v-if="pagination"
      :pageable="pageable"
      :handle-size-change="handleSizeChange"
      :handle-current-change="handleCurrentChange"
    />
  </div>
</template>
<script lang="ts" setup>
import { handleProp } from "@/utils";
import { ref, provide, onMounted } from "vue";
import { ElTable, TableProps } from "element-plus";
import { Refresh, Operation, Search } from "@element-plus/icons-vue";
import { useTable } from "@/hooks/useTable";
// hooks 有自己的相应数据
import { useSelection } from "@/hooks/useSelection";
import { BreakPoint, ColumnProps } from "@/components/ProTable/interface";
import TableColumn from "./components/TableColumn.vue";
import Pagination from "./components/Pagination.vue";
interface ProTableProps extends Partial<Omit<TableProps<any>, "data">> {
  columns: ColumnProps[]; // 列配置项
  requestApi: (params: any) => Promise<any> | any; // 请求表格数据的 api ==> 非必传
  requestAuto?: boolean; // 是否自动执行请求 api ==> 非必传（默认为true）
  requestError?: (params: any) => void; // 表格 api 请求错误监听 ==> 非必传
  dataCallback?: (data: any) => any; // 返回数据的回调函数，可以对数据进行处理 ==> 非必传
  title?: string; // 表格标题，目前只在打印的时候用到 ==> 非必传
  pagination?: boolean; // 是否需要分页组件 ==> 非必传（默认为true）
  initParam?: any; // 初始化请求参数 ==> 非必传（默认为{}）
  border?: boolean; // 是否带有纵向边框 ==> 非必传（默认为true）
  toolButton?: boolean; // 是否显示表格功能按钮 ==> 非必传（默认为true）
  rowKey?: string; // 行数据的 Key，用来优化 Table 的渲染，当表格数据多选时，所指定的 id ==> 非必传（默认为 id）
  searchCol?: number | Record<BreakPoint, number>; // 表格搜索项 每列占比配置 ==> 非必传 { xs: 1, sm: 2, md: 2, lg: 3, xl: 4 }
}
// 接受父组件参数，配置默认值
const props = withDefaults(defineProps<ProTableProps>(), {
  requestAuto: true,
  columns: () => [],
  pagination: true,
  initParam: {},
  border: true,
  toolButton: true,
  rowKey: "id",
  searchCol: () => ({ xs: 1, sm: 2, md: 2, lg: 3, xl: 4 }),
});
// 组件挂在的时候请求网络获取列表数据
onMounted(() => props.requestAuto && getTableList());

// 接收 columns 并设置为响应式
const tableColumns = ref<ColumnProps[]>(props.columns);
// 是否显示搜索模块
const isShowSearch = ref(true);
// 表格DOm元素
const tableRef = ref<InstanceType<typeof ElTable>>();
// 表格多选hooks
const { isSelected, selectedIds, selectedList, selectionChange } =
  useSelection();
// 表格操作 Hooks
const {
  tableData,
  pageable,
  queryParam,
  queryInitParam,
  getTableList,
  handleSizeChange,
  handleCurrentChange,
} = useTable(
  props.requestApi,
  props.initParam,
  props.pagination,
  props.dataCallback,
  props.requestError
);

// 定义 enumMap 存储 enum 值（避免异步请求无法格式化单元格内容 || 无法填充搜索下拉选择）
const enumMap = ref(new Map<string, { [key: string]: any }[]>());
// flatColumns
const flatColumns = ref<ColumnProps[]>();

provide("enumMap", enumMap);
const setEnumMap = async (col: ColumnProps) => {
  if (!col.enum) return;
  // 如果当前 enum 为后台数据需要请求数据，则调用该请求接口，并存储到 enumMap
  if (typeof col.enum !== "function")
    return enumMap.value.set(col.prop!, col.enum!);
  const { data } = await col.enum();
  enumMap.value.set(col.prop!, data);
};

// 扁平化 columns
const flatColumnsFunc = (
  columns: ColumnProps[],
  flatArr: ColumnProps[] = []
) => {
  columns.forEach(async (col) => {
    if (col._children?.length) flatArr.push(...flatColumnsFunc(col._children));
    flatArr.push(col);

    // 给每一项 column 添加 isShow && isFilterEnum 默认属性
    col.isShow = col.isShow ?? true;
    col.isFilterEnum = col.isFilterEnum ?? true;

    // 设置 enumMap
    setEnumMap(col);
  });
  return flatArr.filter((item) => !item._children?.length);
};
flatColumns.value = flatColumnsFunc(tableColumns.value);

// 过滤需要搜索的配置项
const searchColumns = flatColumns.value.filter((item) => item.search?.el);

// 设置搜索表单排序默认值 && 设置搜索表单项的默认值
searchColumns.forEach((column, index) => {
  column.search!.order = column.search!.order ?? index + 2;
  if (
    column.search?.defaultValue !== undefined &&
    column.search?.defaultValue !== null
  ) {
    queryInitParam.value[column.search.key ?? handleProp(column.prop!)] =
      column.search?.defaultValue;
    queryParam.value[column.search.key ?? handleProp(column.prop!)] =
      column.search?.defaultValue;
  }
});

// 排序搜索表单项
searchColumns.sort((a, b) => a.search!.order! - b.search!.order!);

// 清空选中数据列表
const clearSelection = () => tableRef.value!.clearSelection();
// 暴露给父组件的参数和方法(外部需要什么，都可以从这里暴露出去)
defineExpose({
  element: tableRef,
  tableData,
  queryParam,
  pageable,
  getTableList,
  clearSelection,
  enumMap,
  isSelected,
  selectedList,
  selectedIds,
});
</script>

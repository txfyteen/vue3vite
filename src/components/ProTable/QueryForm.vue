<template>
  <div>{{ state.fieldList }}</div>
  <el-form
    id="t_query_condition"
    v-bind="$attrs"
    :label-width="labelWidth"
    :form="state.fieldList"
    size="default"
    class="t-query-condition"
    :style="{
      'grid-template-areas': gridAreas,
    }"
    @submit.prevent
  >
    <el-form-item
      v-for="(opt, i) in cOpts"
      :key="i"
      :label="opt.label"
      :label-width="opt.labelWidth"
      v-bind="$attrs"
      :style="{ gridArea: i }"
      :class="[opt.className, { render_label: opt.labelRender }]"
    >
      <!-- 自定义label -->
      <template #label v-if="opt.labelRender">
        <render-comp :form="state.fieldList" :render="opt.labelRender" />
      </template>
      <!-- 自定义输入框插槽 -->
      <template v-if="opt.slotName">
        <slot :name="opt.slotName" :param="state.fieldList"></slot>
      </template>
      <component
        v-if="!opt.slotName && opt.comp.includes('date')"
        :is="opt.comp"
        v-bind="
          typeof opt.bind == 'function'
            ? opt.bind(state.fieldList)
            : { clearable: true, filterable: true, ...$attrs, ...opt.bind }
        "
        :placeholder="opt.placeholder || getPlaceholder(opt)"
        @change="handleEvent(opt.event, state.fieldList[opt.dataIndex])"
        v-model="state.fieldList[opt.dataIndex]"
      />
      <component
        v-if="!opt.slotName && opt.comp.includes('tree-select')"
        :is="opt.comp"
        v-bind="
          typeof opt.bind == 'function'
            ? opt.bind(state.fieldList)
            : { clearable: true, filterable: true, ...$attrs, ...opt.bind }
        "
        :placeholder="opt.placeholder || getPlaceholder(opt)"
        @change="handleEvent(opt.event, state.fieldList[opt.dataIndex])"
        v-model="state.fieldList[opt.dataIndex]"
      />
      <component
        v-if="
          !opt.slotName &&
          !opt.comp.includes('date') &&
          !opt.comp.includes('tree-select')
        "
        :is="opt.comp"
        v-bind="
          typeof opt.bind == 'function'
            ? opt.bind(state.fieldList)
            : { clearable: true, filterable: true, ...$attrs, ...opt.bind }
        "
        :placeholder="opt.placeholder || getPlaceholder(opt)"
        @change="handleEvent(opt.event, state.fieldList[opt.dataIndex])"
        v-model="state.fieldList[opt.dataIndex]"
      >
        <component
          :is="compChildName(opt)"
          v-for="(value, key, index) in selectListType(opt)"
          :key="index"
          :disabled="value.disabled"
          :label="compChildLabel(opt, value)"
          :value="compChildValue(opt, value, key)"
          >{{ compChildShowLabel(opt, value) }}</component
        >
      </component>
    </el-form-item>
    <el-form-item
      v-if="Object.keys(cOpts).length > 0"
      label-width="0"
      style="grid-area: submit_btn"
      :class="['btn flex_end']"
    >
      <el-button
        class="btn_check"
        @click="checkHandle"
        v-bind="queryAttrs"
        :loading="loading"
        >查询</el-button
      >
      <el-button
        v-if="reset"
        class="btn_reset"
        v-bind="resetAttrs"
        @click="resetHandle"
        >重置</el-button
      >
      <slot name="querybar"></slot>
      <el-button
        v-if="originCellLength > colLength && isShowOpen"
        @click="open = !open"
        link
      >
        {{ open ? "收起" : "展开" }}{{ originCellLength }}
        <el-icon v-if="open">
          <ArrowUp />
        </el-icon>
        <el-icon v-else>
          <ArrowDown />
        </el-icon>
      </el-button>
    </el-form-item>
  </el-form>
</template>
<script setup lang="ts" name="QueryForm">
import { computed, onMounted, reactive, ref, watch } from "vue";
import { BreakPoint } from "@/components/ProTable/interface";
type opts = {
  [key: string]: any;
};
interface Props {
  opts: opts;
  labelWidth: string;
  btnCheckBind: object;
  btnResetBind: object;
  loading: boolean;
  boolEnter: boolean;
  reset: boolean;
  isShowOpen: boolean;
  isExpansion: boolean;
  cols?: number | Record<BreakPoint, number>;
}

//给interface设置默认值,以箭头函数的形式返回对象
const props = withDefaults(defineProps<Props>(), {
  opts: () => ({}),
  labelWidth: "110px",
  loading: false,
  reset: false,
  boolEnter: true,
  isShowOpen: true,
  isExpansion: false,
  cols: () => ({ xs: 1, sm: 2, md: 2, lg: 3, xl: 4 }),
});
const state = reactive({
  fieldList: Object.keys(props.opts).reduce(
    (previousValue: any, currentValue: any) => {
      debugger;
      previousValue[currentValue] =
        props.opts[currentValue].defaultValue || null;
      console.log(previousValue);
      return previousValue;
    },
    () => ({})
  ),
});

const open = ref(false);
if (props.isExpansion) {
  open.value = true;
} else {
  open.value = false;
}

// 查询按钮配置
const queryAttrs = computed(() => {
  return {
    type: "primary",
    size: "default",
    ...props.btnCheckBind,
  };
});
// 重置按钮配置
const resetAttrs = computed(() => {
  return {
    size: "default",
    ...props.btnResetBind,
  };
});

const originCellLength = computed(() => {
  let length = 0;
  Object.keys(props.opts).forEach((key) => {
    let span = props.opts[key].span || 1;
    if ((length % colLength.value) + span > colLength.value) {
      length += colLength.value - (length % colLength.value);
    }
    length += span;
  });
  return length;
});
const cOpts = computed(() => {
  let renderSpan = 0;
  let formatOpts = Object.keys(props.opts).reduce((acc: any, field: any) => {
    let opt = {
      ...props.opts[field],
    };
    // 如果展开
    if (props.isShowOpen) {
      renderSpan += opt.span ?? 1;
      // 如果是收起的状态，则 只显示一行的字段。不在进行追加
      if (!open.value && renderSpan > colLength.value) {
        console.log(acc);
        return acc;
      }
    }
    // 字段和组件绑定
    opt.dataIndex = field;
    acc[field] = opt;
    return acc;
  }, {});
  console.log(formatOpts);
  return formatOpts;
});

const gridAreas = computed(() => {
  // grid布局按钮位置
  const fields = Object.keys(cOpts.value);
  let rowIndex = 0;
  let rowSpan = 0;
  const areas: any = [[]];
  for (let fieldIndex = 0; fieldIndex < fields.length; fieldIndex++) {
    const field = fields[fieldIndex];
    const opt = cOpts.value[field];
    const span = Math.min(opt.span ?? 1, 4); // 最大4
    // 默认一行colLength.value， 如果当前的行数大于实际的行数的时候需要换行
    // 同时areas的内容重新排版
    if (rowSpan + span > colLength.value) {
      rowSpan = 0;
      areas[++rowIndex] = [];
    }
    rowSpan += span;
    // 字段根据他的span决定他占据几行，没占满
    for (let index = 0; index < span; index++) {
      console.log(index, span);
      areas[rowIndex].push(field);
    }
  }
  if (!open.value) {
    let submit = [];
    for (let i = 0; i < rowSpan; i++) {
      submit.push("submit_btn");
    }
    areas.push(submit);
    // 展开两种情况 ：最后一行没满，补全按钮位置，最后一行满，按钮换行
  } else {
    let areasLength = areas.length;
    let lastArea = areas[areasLength - 1];
    // 没有占满一行的列数，补全按钮位置
    if (lastArea.length < colLength.value) {
      let availableSpan = colLength.value - lastArea.length;
      for (let i = 0; i < availableSpan; i++) {
        lastArea.push("submit_btn");
      }
    } else {
      let lastArea = [];
      for (let i = 0; i < colLength.value; i++) {
        lastArea.push("submit_btn");
      }
      areas.push(lastArea);
    }
  }

  return areas.reduce((acc: any, cur: any) => {
    acc += `'${cur.join(" ")}'\n`;
    return acc;
  }, "");
});
// 初始化表单数据
const initForm = (opts: opts, keepVal = false) => {
  return Object.keys(opts).reduce((acc: any, field: any) => {
    if (keepVal && state.fieldList) {
      acc[field] = state.fieldList[field];
    } else if (opts[field].defaultVal) {
      acc[field] = opts[field].defaultVal;
    } else {
      acc[field] = null;
    }
    return acc;
  }, {});
};

const emits = defineEmits(["handleEvent", "submit", "reset"]);
// 重置
const resetHandle = () => {
  state.fieldList = initForm(props.opts);
  emits("reset", state.fieldList);
  checkHandle("reset");
};
// 查询条件change事件
const handleEvent = (type: any, val: any) => {
  emits("handleEvent", type, val, state.fieldList);
};
// 查询
const checkHandle = (flagText: any = false) => {
  emits("submit", state.fieldList, flagText);
};
// 子组件名称
const compChildName = computed(() => {
  return (opt: any) => {
    switch (opt.type) {
      case "checkbox":
        return "el-checkbox";
      case "radio":
        return "el-radio";
      case "select-arr":
      case "select-obj":
        return "el-option";
    }
  };
});
// 下拉数据
const selectListType = computed(() => {
  return (opt: any) => {
    if (opt.listTypeInfo) {
      return opt.listTypeInfo[opt.list];
    } else {
      return [];
    }
  };
});
// 子子组件label
const compChildLabel = computed(() => {
  return (opt: any, value: any) => {
    switch (opt.type) {
      case "radio":
      case "checkbox":
        return value.value;
      case "el-select-multiple":
      case "select-arr":
        return value[opt.arrLabel || "dictLabel"];
      case "select-obj":
        return value;
    }
  };
});
// 子子组件value
const compChildValue = computed(() => {
  return (opt: any, value: any, key: any) => {
    switch (opt.type) {
      case "radio":
      case "checkbox":
        return value.value;
      case "el-select-multiple":
      case "select-arr":
        return value[opt.arrKey || "dictValue"];
      case "select-obj":
        return key;
    }
  };
});
// 子子组件文字展示
const compChildShowLabel = computed(() => {
  return (opt: any, value: any) => {
    switch (opt.type) {
      case "radio":
      case "checkbox":
        return value.label;
      case "el-select-multiple":
      case "select-arr":
        return value[opt.arrLabel || "dictLabel"];
      case "select-obj":
        return value;
    }
  };
});
// placeholder的显示
const getPlaceholder = (row: any) => {
  // console.log(77, row.date)
  let placeholder;
  if (row.comp && typeof row.comp == "string") {
    if (row.comp.includes("input")) {
      placeholder = "请输入" + row.label;
    } else if (row.comp.includes("select") || row.comp.includes("date")) {
      placeholder = "请选择" + row.label;
    } else {
      placeholder = row.label;
    }
  }
  return placeholder;
};
onMounted(() => {
  if (props.boolEnter) {
    document.onkeyup = (e) => {
      // console.log(7777, e)
      let key = e.keyCode;
      let pagination = document.querySelectorAll(".el-pagination");
      let isPaginationInputFocus = false;
      if (pagination) {
        pagination.forEach((ele) => {
          let paginationInputList = ele.getElementsByTagName("input");
          let paginationInput =
            paginationInputList[paginationInputList.length - 1];
          // 判断是否有分页器筛选输入框获取焦点
          if (paginationInput === document.activeElement) {
            isPaginationInputFocus = true;
          }
        });
      }
      if (isPaginationInputFocus) {
        return;
      }
      if (key === 13) {
        checkHandle();
      }
    };
  }
});
watch(
  () => props.opts,
  (opts) => {
    state.fieldList = initForm(opts, true);
  }
);
// 注入响应式断点
let breakPoint = ref<BreakPoint>("xl");
onMounted(() => {
  resize({ target: { innerWidth: window.innerWidth } } as any);
  window.addEventListener("resize", resize);
});

// 监听屏幕变化
const resize = (e: UIEvent) => {
  let width = (e.target as Window).innerWidth;
  switch (!!width) {
    case width < 768:
      breakPoint.value = "xs";
      break;
    case width >= 768 && width < 992:
      breakPoint.value = "sm";
      break;
    case width >= 992 && width < 1200:
      breakPoint.value = "md";
      break;
    case width >= 1200 && width < 1920:
      breakPoint.value = "lg";
      break;
    case width >= 1920:
      breakPoint.value = "xl";
      break;
  }
};
// 根据不同的断点范围注入不同的cols值 cols
const colLength = computed(() => {
  if (typeof props.cols === "object")
    return props.cols[breakPoint.value] ?? props.cols;
  return props.cols;
});
// 暴露方法出去
defineExpose({ state });
</script>
<style lang="scss">
.t-query-condition.el-form {
  position: relative;
  display: grid;
  gap: 2px 8px;
  margin-bottom: -7px;
  text-align: left;

  .el-select,
  .el-date-editor,
  .ant-calendar-picker {
    width: 100%;
  }

  .flex_end {
    grid-area: submit_btn;
    margin-top: 2px;

    .el-form-item__content {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      overflow: visible !important;
    }
  }

  .btn {
    text-align: end;

    .el-form-item__content {
      display: flex;
      justify-content: flex-end;
    }
  }

  .el-form-item {
    display: flex;
    margin-bottom: 6px;

    .el-form-item__label {
      flex-shrink: 0;
      min-width: 60px;
      padding-left: 8px;
    }

    .el-form-item__content {
      flex-grow: 1;
      // overflow: hidden;
      margin-left: 0 !important;
    }
  }

  .render_label {
    .el-form-item__label {
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: flex-end;

      &::before {
        margin-top: 1px;
      }
    }
  }

  .btn_check {
    position: relative;
    top: -1px;
  }

  .btn_reset {
    position: relative;
    top: -1px;
    margin-left: 8px;
  }
}
</style>

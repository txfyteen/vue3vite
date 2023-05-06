<template>
  <RenderTableColumn v-bind="column" />
</template>

<script lang="tsx" setup name="TableColumn">
import { inject, ref, useSlots } from "vue";
import { ColumnProps } from "@/components/ProTable/interface";
import {
  filterEnum,
  formatValue,
  handleProp,
  handleRowAccordingToProp,
} from "@/utils";

defineProps<{ column: ColumnProps }>();

const slots = useSlots();

const enumMap = inject("enumMap", ref(new Map()));

// 渲染表格数据
const renderCellData = (item: ColumnProps, scope: { [key: string]: any }) => {
  return enumMap.value.get(item.prop) && item.isFilterEnum
    ? filterEnum(
        handleRowAccordingToProp(scope.row, item.prop!),
        enumMap.value.get(item.prop)!,
        item.fieldNames
      )
    : formatValue(handleRowAccordingToProp(scope.row, item.prop!));
};

// 获取 tag 类型
const getTagType = (item: ColumnProps, scope: { [key: string]: any }) => {
  return filterEnum(
    handleRowAccordingToProp(scope.row, item.prop!),
    enumMap.value.get(item.prop),
    item.fieldNames,
    "tag"
  );
};

const RenderTableColumn = (item: ColumnProps) => {
  return (
    <>
      {item.isShow && (
        <el-table-column
          {...item}
          align={item.align ?? "center"}
          showOverflowTooltip={
            item.showOverflowTooltip ?? item.prop !== "operation"
          }
        >
          {{
            default: (scope: any) => {
              if (item._children)
                return item._children.map((child) => RenderTableColumn(child));
              if (item.render) return item.render(scope);
              if (slots[handleProp(item.prop!)])
                return slots[handleProp(item.prop!)]!(scope);
              if (item.tag)
                return (
                  <el-tag type={getTagType(item, scope)}>
                    {renderCellData(item, scope)}
                  </el-tag>
                );
              return renderCellData(item, scope);
            },
            header: () => {
              // 如果有自定义头部就要渲染头部
              if (item.headerRender) return item.headerRender(item);
              // 自定义也有可能是通过slot形式传递下来的slot
              if (slots[`${handleProp(item.prop!)}Header`])
                return slots[`${handleProp(item.prop!)}Header`]!({ row: item });
              return item.label;
            },
          }}
        </el-table-column>
      )}
    </>
  );
};
</script>

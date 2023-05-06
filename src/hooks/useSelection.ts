import { ref, computed } from "vue";
export const useSelection = (rowKey: string = "id") => {
  // 是否全选
  const isSelected = ref<boolean>(false);
  // 全选的列表
  const selectedList = ref<{ [key: string]: any }[]>([]);
  /**
   * 获取当前选中的所有id
   */
  const selectedIds = computed((): string[] => {
    let ids: string[] = [];
    selectedList.value.forEach((item) => ids.push(item[rowKey]));
    return ids;
  });
  /**
   * @description 多选操作
   * @param {Array} rowArr 当前选择的所有数据
   * @return void
   */
  const selectionChange = (rowArray: { [key: string]: any }[]) => {
    rowArray.length ? (isSelected.value = true) : (isSelected.value = false);
    selectedList.value = rowArray;
  };

  return {
    isSelected,
    selectedList,
    selectedIds,
    selectionChange,
  };
};

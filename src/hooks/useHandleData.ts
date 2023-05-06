import { ElMessageBox, ElMessage } from "element-plus";

export type MessageType = "" | "success" | "warning" | "info" | "error";

export const useHandleData = (
  api: (params: any) => Promise<any> | any,
  params: any = {},
  message: string,
  confirmType: MessageType = "warning"
) => {
  return new Promise((resolve, reject) => {
    ElMessageBox.confirm(`是否${message}?`, "温馨提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: confirmType,
      draggable: true,
    }).then(async () => {
      const res = await api(params);
      if (!res) return reject(false);
      ElMessage({
        type: "success",
        message: `${message}成功!`,
      });
      resolve(true);
    });
  });
};

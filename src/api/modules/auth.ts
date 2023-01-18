import request from "@/api/request";
import { LoginModule, PromiseRes } from "@/api/interface";

// 继承不一样的标准'standard-with-typescript', 需要校验await和async 以及返回值

/**
 * @name 登录模块
 */
// * 用户登录接口 Promise<LoginRes> 告诉返回的类型是一个Promise,同时里面的类型变量为LoginRes
export const loginApi = (
  params: LoginModule.LoginParams
  // Promise<BaseResult> 都是通过用的可以再通过自定义类型简化
): PromiseRes<LoginModule.LoginRes> => {
  // 返回的是带Promise的泛型类型
  return request.post(`/api/login`, params, {
    headers: { noLoading: true },
  });
};
// 获取登录用户信息
export const getUserInfoApi = (): PromiseRes<LoginModule.MenuInfo> =>
  request.get("/menu/info");

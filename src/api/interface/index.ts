export interface BaseResult<T> {
  code: number;
  data: T;
}
// 声明类型简化书写,将不变的东西简写Promise<BaseResult>
export type PromiseRes<T> = Promise<BaseResult<T>>;

// 登录模块相关
export namespace LoginModule {
  export interface LoginParams {
    username: string;
    password: string;
  }
  // 所有的接口都有公用的code和message
  export interface LoginRes {
    code: number;
    data: {
      token: string;
      tokenHead: string;
    };
    message: string;
  }

  export interface MenuInfo {
    menus: [];
  }
}

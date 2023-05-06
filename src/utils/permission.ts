import { RouteRecordRaw } from "vue-router";

export const hasPermission = (roles: string[], route: RouteRecordRaw) => {
  // 找出当前角色的所有菜单
  if (route.meta && route.meta.roles) {
    return roles.some((role) => {
      if (route.meta?.role !== undefined) {
        return route.meta.roles?.includes(role);
      } else {
        return false;
      }
    });
  }
};

export const filterAsyncRoutes = (
  routes: RouteRecordRaw[],
  roles: string[]
) => {
  const res: RouteRecordRaw[] = [];
  // 遍历每一个路由，校验权限
  routes.forEach((route) => {
    // 取出每一个item
    const routeItem = { ...route };
    // 检查用户角色是否具备访问路由的权限
    if (hasPermission(roles, routeItem)) {
      // 当路由具备访问的权限时，判断路由是否具备 children 属性
      if (routeItem.children) {
        routeItem.children = filterAsyncRoutes(routeItem.children, roles);
      }
      res.push(routeItem);
    }
  });
  // 扁平化的权限数组列表
  return res;
};

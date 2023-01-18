import { createRouter, createWebHashHistory } from "vue-router";
import NProgress from "@/config/nprogress";
import { staticRouter } from "@/routers/modules/staticRouter";
import type { App } from "vue";

const router = createRouter({
  history: createWebHashHistory(),
  strict: false,
  routes: [...staticRouter],
  scrollBehavior: () => ({
    left: 0,
    top: 0,
  }),
});

router.beforeEach(async (to, from, next) => {
  NProgress.start();
  if (to.path === "/login") {
    next();
  }
  const token = "test";
  if (!token) {
    next({ path: "/login", replace: true });
  }
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export async function setupRouter(app: App) {
  app.use(router);
}

export default router;

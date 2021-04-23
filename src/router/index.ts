import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import auth from "./auth.routes";
import basic from "./basic.routes";
import component from "./component.routes";
import NProgress from "../utils/progress";
import TitleHelper from "../utils/title";

export const routes: Array<RouteRecordRaw> = [
  ...auth.routes,
  ...component.routes,
  ...basic.routes,
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach((to: any, from: any, next: any) => {
  NProgress.start();
  TitleHelper(to, from, next);

  next();
});
// When each route is finished evaluating...
router.afterEach((routeTo, routeFrom) => {
  // Complete the animation of the route progress bar.
  NProgress.done();
});
export default router;

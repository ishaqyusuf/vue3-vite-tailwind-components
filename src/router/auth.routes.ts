import { RouteRecordRaw } from "vue-router";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Auth/Login.vue"),
    meta: {
      beforeEach: (to, from, next) => {},
    },
  },
];

export default { routes };

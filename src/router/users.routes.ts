import { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    name: "users",
    path: "/:mode",
    props: true,
    meta: {
      title: "Users",
    },
    component: () => import("../views/Admin/Users/Index.vue"),
  },
  {
    path: "/:mode/:slug",
    component: () => import("../views/Admin/Users/User/Index.vue"),
    props: true,
    name: "user",
    meta: {
      title: "User",
    },
  },
];

export default { routes };

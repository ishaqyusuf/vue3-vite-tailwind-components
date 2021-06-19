import { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    name: "users",
    path: "/:mode",
    props: true,
    meta: {
      title: "Users",
    },
    component: () => import("../views/Admin/Users/UsersIndex.vue"),
  },
  {
    path: "/:mode/:slug",
    component: () => import("../views/Admin/Users/User/UserIndex.vue"),
    props: true,
    name: "user",
    meta: {
      title: "User",
    },
  },
];

export default { routes };

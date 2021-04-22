import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import NotFound from "../views/NotFound.vue";
import auth from "./auth.routes";
import basic from "./basic.routes";
import component from "./component.routes";

export const routes: Array<RouteRecordRaw> = [
  ...auth.routes,
  ...basic.routes,
  ...component.routes,
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { layout: "default-layout" },
  },
  {
    path: "/components",
    name: "components",
    component: () => import("../views/Components/Index.vue"),
    meta: {
      title: "Components",
    },
    children: [
      {
        path: "form",
        name: "form",
        component: () => import("../views/Components/Form.vue"),
      },
      {
        path: "table",
        name: "table",
        component: () => import("../views/Components/TableComponent.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Auth/Login.vue"),
    meta: {
      beforeEach: (to, from, next) => {},
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
    meta: { layout: "default-layout" },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach((to: any, from: any, next: any) => {
  // _user.loadUser();

  let metas = to.matched;
  if (metas.length == 0) metas = from.matched;
  let pubs: any[] = metas.slice().reverse();
  let meta = pubs[0]?.meta;

  const nearestWithTitle = to.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.title);

  const title = ["Vite"];
  if (nearestWithTitle) title.unshift(nearestWithTitle.meta.title);
  // if (to.name == "logout" || (from.name == "logout" && !to.name)) {
  //   _user.logout();
  // }
  document.title = title.filter(Boolean).join(" | ");
  next();
});
export default router;

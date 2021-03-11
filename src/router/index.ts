import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import NotFound from "../views/NotFound.vue";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { layout: "default-layout" },
  },
  {
    path: "/components",
    name: "Components",
    component: () => import("../views/Components.vue"),
    meta: {
      title: "Components",
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

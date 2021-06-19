import { RouteRecordRaw } from "vue-router";
const routes: Array<RouteRecordRaw> = [
  {
    path: "",
    name: "home",
    component: () => import("../views/Home.vue"),
    redirect: { name: "tracking" },
  },
  {
    path: "/tracking",
    name: "tracking",
    component: () => import("../views/Guests/Tracking/TrackingIndex.vue"),
  },
  {
    path: "/tracking/:code",
    name: "track",
    component: () => import("../views/Guests/TrackResult/TrackResultIndex.vue"),
    props: true,
  },
  {
    path: "/customer-service",
    name: "customer-service",
    component: () =>
      import("../views/CustomerService/CustomerServiceIndex.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("../views/NotFound.vue"),

    meta: { layout: "default-layout" },
  },
];

export default { routes };

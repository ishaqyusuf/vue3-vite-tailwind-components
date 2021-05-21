import { RouteRecordRaw } from "vue-router";

import parcelRoutes from "./parcel.routes";
const routes: Array<RouteRecordRaw> = [
  ...parcelRoutes.routes,
  {
    name: "dashboard",
    path: "/dashboard",
    component: () => import("../views/Admin/Dashboard/Index.vue"),
  },
  {
    name: "customers",
    path: "/customers",
    component: () => import("../views/Admin/Customers/Index.vue"),
  },
  {
    name: "employees",
    path: "/employees",
    component: () => import("../views/Admin/Employees/Index.vue"),
  },
  {
    name: "scanner",
    path: "/parcel-scanner",
    component: () => import("../views/Admin/Scanner/Index.vue"),
  },
  {
    name: "shipments",
    path: "/shipments",
    component: () => import("../views/Admin/Shipments/Index.vue"),
  },
  {
    name: "roles",
    path: "/roles",
    component: () => import("../views/Admin/Roles/Index.vue"),
  },
];
export default { routes };

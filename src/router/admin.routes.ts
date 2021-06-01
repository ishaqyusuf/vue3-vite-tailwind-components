import { RouteRecordRaw } from "vue-router";

import parcelRoutes from "./parcel.routes";
import shipmentRoutesRoutes from "./shipment-routes.routes";
import shipmentsRoutes from "./shipments.routes";
const routes: Array<RouteRecordRaw> = [
  ...shipmentRoutesRoutes.routes,
  ...parcelRoutes.routes,
  ...shipmentsRoutes.routes,
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
    name: "customer",
    path: "/customer/:customer_slug",
    component: () => import("../views/Admin/Customers/Customer/Index.vue"),
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
    name: "roles",
    path: "/roles",
    component: () => import("../views/Admin/Roles/Index.vue"),
  },
];
export default { routes };

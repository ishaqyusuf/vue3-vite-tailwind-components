import { RouteRecordRaw } from "vue-router";

import parcelRoutes from "./parcel.routes";
import shipmentRoutesRoutes from "./shipment-routes.routes";
import shipmentsRoutes from "./shipments.routes";
import settingsRoutes from "./settings.routes";
import userRoutes from "./users.routes";
import invoiceRoutes from "./invoice.routes";
const routes: Array<RouteRecordRaw> = [
  ...shipmentRoutesRoutes.routes,
  ...parcelRoutes.routes,
  ...shipmentsRoutes.routes,
  ...settingsRoutes.routes,
  ...userRoutes.routes,
  ...invoiceRoutes.routes,
  {
    name: "dashboard",
    path: "/dashboard",
    component: () => import("../views/Admin/Dashboard/Index.vue"),
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

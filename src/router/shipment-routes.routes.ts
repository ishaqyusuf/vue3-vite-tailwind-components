import { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    name: "shipment-routes",
    path: "/shipment-routes",
    meta: {
      title: "Shipment Routes",
    },
    component: () =>
      import("../views/Admin/ShipmentRoutes/ShipmentRoutesIndex.vue"),
  },
  {
    path: "/shipment-route/:slug",
    component: () =>
      import("../views/Admin/ShipmentRoute/ShipmentRouteIndex.vue"),
    props: true,
    children: [
      {
        name: "shipment-route",
        props: true,
        path: "",
        meta: {
          title: "Shipment Route",
        },
        component: () => import("../views/Admin/ShipmentRoute/Overview.vue"),
      },
      {
        name: "route-activity",
        props: true,
        path: "activities",
        meta: {
          title: "Activites | Route",
        },
        component: () => import("../views/Admin/ShipmentRoute/Activity.vue"),
      },
      {
        name: "route-progress",
        props: true,
        path: "route-progress",
        meta: {
          title: "Route Progress | Route",
        },
        component: () =>
          import("../views/Admin/ShipmentRoute/RouteProgress.vue"),
      },
      {
        name: "route-notes",
        props: true,
        path: "route-notes",
        meta: {
          title: "Notes",
        },
        component: () => import("../views/Admin/ShipmentRoute/Notes.vue"),
      },
      {
        name: "route-documents",
        props: true,
        path: "route-documents",
        meta: {
          title: "Documents",
        },
        component: () => import("../views/Admin/ShipmentRoute/Documents.vue"),
      },
      {
        name: "route-parcels",
        props: true,
        path: "active-parcels",
        meta: {
          title: "Active Parcels",
        },
        component: () =>
          import("../views/Admin/ShipmentRoute/ActiveParcels.vue"),
      },
    ],
  },
];

export default { routes };

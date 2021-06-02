import { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    name: "shipments",
    path: "/shipments",
    meta: {
      title: "Shipments",
    },
    component: () => import("../views/Admin/Shipments/Index.vue"),
  },
  {
    path: "/shipment/:slug",
    component: () => import("../views/Admin/Shipment/Index.vue"),
    props: true,
    children: [
      {
        name: "shipment",
        props: true,
        path: "",
        meta: {
          title: "Shipment",
        },
        component: () => import("../views/Admin/Shipment/ShipmentOverview.vue"),
      },
      {
        name: "shipment-activity",
        props: true,
        path: "activities",
        meta: {
          title: "Activites | Shipment",
        },
        component: () => import("../views/Admin/Shipment/ShipmentActivity.vue"),
      },
      {
        name: "shipment-progress",
        props: true,
        path: "route-progress",
        meta: {
          title: "Route Progress | Shipment",
        },
        component: () => import("../views/Admin/Shipment/RouteProgress.vue"),
      },
      {
        name: "shipment-notes",
        props: true,
        path: "notes",
        meta: {
          title: "Notes",
        },
        component: () => import("../views/Admin/Shipment/ShipmentNotes.vue"),
      },
      {
        name: "shipment-documents",
        props: true,
        path: "documents",
        meta: {
          title: "Documents",
        },
        component: () => import("../views/Admin/Shipment/ShipmentDocs.vue"),
      },
      {
        name: "shipment-parcels",
        props: true,
        path: "active-parcels",
        meta: {
          title: "Active Parcels",
        },
        component: () => import("../views/Admin/Shipment/ActiveParcels.vue"),
      },
      //   {
      //     name: "parcel-documents",
      //     props: true,
      //     path: "documents",
      //     component: () =>
      //       import("../views/Admin/Components/Documents/Index.vue"),
      //   },
      //   {
      //     name: "parcel-notes",
      //     props: true,
      //     path: "notes",
      //     component: () => import("../views/Admin/Components/Notes/Index.vue"),
      //   },
    ],
  },
];

export default { routes };

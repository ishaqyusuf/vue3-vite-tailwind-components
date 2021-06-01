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
        component: () => import("../views/Admin/Shipment/Overview.vue"),
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

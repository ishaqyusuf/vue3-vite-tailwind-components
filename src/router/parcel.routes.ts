import { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    name: "parcels",
    path: "/parcels",
    component: () => import("../views/Admin/Parcels/Index.vue"),
    meta: {
      title: "Parcels",
    },
  },
  {
    path: "/parcel/:slug",
    component: () => import("../views/Admin/Parcel/Index.vue"),
    props: true,
    children: [
      {
        name: "parcel-overview",
        props: true,
        path: "",
        component: () => import("../views/Admin/Parcel/TrackingTab.vue"),
      },
      {
        name: "parcel-documents",
        props: true,
        path: "documents",
        component: () => import("../views/Admin/Parcel/ParcelDocs.vue"),
      },
      {
        name: "parcel-notes",
        props: true,
        path: "notes",
        component: () => import("../views/Admin/Parcel/ParcelNotes.vue"),
      },
    ],
  },
];

export default { routes };

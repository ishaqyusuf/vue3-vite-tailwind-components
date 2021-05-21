import { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    name: "parcels",
    path: "/parcels",
    component: () => import("../views/Admin/Parcels/Index.vue"),
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
    ],
  },
];

export default { routes };

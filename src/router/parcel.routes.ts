import { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    name: "parcels",
    path: "/parcels",
    component: () => import("../views/Admin/Parcels/Index.vue"),
  },
  {
    path: "/parcel/:parcel_slug",
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
        component: () =>
          import("../views/Admin/Components/Documents/Index.vue"),
      },
    ],
  },
];

export default { routes };

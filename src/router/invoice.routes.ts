import { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    name: "invoices",
    path: "/invoices",
    meta: {
      title: "Invoices",
    },
    component: () => import("../views/Admin/Invoices/Index.vue"),
  },
  {
    path: "/invoice/:slug",
    component: () => import("../views/Admin/Invoices/Invoice/Index.vue"),
    props: true,
    name: "invoice",
    meta: {
      title: "Invoice",
    },
  },
];

export default { routes };

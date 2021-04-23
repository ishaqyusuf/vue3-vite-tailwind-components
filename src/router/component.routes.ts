import { RouteRecordRaw } from "vue-router";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/components",
    name: "components",
    component: () => import("../views/Components/Index.vue"),
    meta: {
      title: "Components",
    },
    children: [
      {
        path: "form",
        name: "form",
        component: () => import("../views/Components/Form.vue"),
      },
      {
        path: "table",
        name: "table",
        component: () => import("../views/Components/TableComponent.vue"),
      },
    ],
  },
];

export default { routes };

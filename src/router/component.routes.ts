import { RouteRecordRaw } from "vue-router";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/components",
    name: "components",
    redirect: { name: "form" },
    component: () => import("../views/Components/ComponentsIndex.vue"),
    meta: {
      title: "Components",
    },
    children: [
      {
        path: "form",
        name: "form-component",
        component: () => import("../views/Components/Form.vue"),
      },
      {
        path: "table",
        name: "table-component",
        component: () => import("../views/Components/TableComponent.vue"),
      },
      {
        path: "calendar",
        name: "calendar-component",
        component: () => import("../views/Components/CalendarComponent.vue"),
      },
    ],
  },
];

export default { routes };

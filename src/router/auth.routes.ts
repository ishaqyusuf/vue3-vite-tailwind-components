import { RouteRecordRaw } from "vue-router";
const routes: Array<RouteRecordRaw> = [
  {
    path: "",
    component: () => import("../views/Auth/AuthIndex.vue"),
    meta: {
      fullScreen: true,
    },
    children: [
      {
        path: "/sign-in",
        name: "login",
        component: () => import("../views/Auth/Login.vue"),
        meta: {
          beforeEach: (to, from, next) => {},
        },
      },
      {
        path: "/i-forgot",
        name: "forgot-password",
        component: () => import("../views/Auth/IForgot.vue"),
        meta: {
          beforeEach: (to, from, next) => {},
        },
        props: true, //(route) => ({ query: route.query, params: route.params }),
      },
      {
        path: "/reset-password/:email/:token",
        name: "reset-password",
        props: true,
        //  (route) => {
        //   return {
        //     query: route.query,
        //     params: route.params,
        //   };
        // },
        component: () => import("../views/Auth/ResetPassword.vue"),
      },
    ],
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/Auth/Register.vue"),
    meta: {
      fullScreen: true,
      beforeEach: (to, from, next) => {},
    },
  },
  {
    path: "/logout",
    name: "logout",
    component: () => import("../views/Auth/Logout.vue"),
  },
];

export default { routes };

import { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    name: "settings",
    path: "/settings",
    redirect: { name: "profile" },
    meta: {
      title: "Settings",
    },
    component: () => import("../views/Settings/Index.vue"),
    children: [
      {
        path: "profile",
        component: () => import("../views/Settings/Profile/Index.vue"),
        name: "profile",
        meta: {
          title: "Account Settings",
        },
      },
      {
        path: "address-book",
        component: () => import("../views/Settings/AddressBook/Index.vue"),
        name: "address-setting",
        meta: {
          title: "Address Book",
        },
      },
      {
        path: "invoice-settings",
        component: () => import("../views/Settings/InvoiceSetting/Index.vue"),
        name: "invoice-setting",
        meta: {
          title: "Invoice Settings",
        },
      },
      {
        path: "parcel-settings",
        component: () => import("../views/Settings/ParcelSetting/Index.vue"),
        name: "parcel-setting",
        meta: {
          title: "Parcel Configuration",
        },
      },
      {
        path: "shipment-settings",
        component: () => import("../views/Settings/ShipmentSetting/Index.vue"),
        name: "shipment-setting",
        meta: {
          title: "Shipment Configuration",
        },
      },
      {
        path: "label-settings",
        component: () => import("../views/Settings/LabelSetting/Index.vue"),
        name: "label-setting",
        meta: {
          title: "Label Settings",
        },
      },
      {
        path: "unit-settings",
        component: () => import("../views/Settings/UnitSetting/Index.vue"),
        name: "unit-setting",
        meta: {
          title: "Units & Currency",
        },
      },
    ],
  },
];

export default { routes };

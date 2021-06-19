import { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    name: "settings",
    path: "/settings",
    redirect: { name: "profile" },
    meta: {
      title: "Settings",
    },
    component: () => import("../views/Settings/SettingsIndex.vue"),
    children: [
      {
        path: "profile",
        component: () => import("../views/Settings/Profile/ProfileIndex.vue"),
        name: "profile",
        meta: {
          title: "Account Settings",
        },
      },
      {
        path: "address-book",
        component: () =>
          import("../views/Settings/AddressBook/AddressBookIndex.vue"),
        name: "address-setting",
        meta: {
          title: "Address Book",
        },
      },
      {
        path: "invoice-settings",
        component: () =>
          import("../views/Settings/InvoiceSetting/InvoiceSettingIndex.vue"),
        name: "invoice-setting",
        meta: {
          title: "Invoice Settings",
        },
      },
      {
        path: "parcel-settings",
        component: () =>
          import("../views/Settings/ParcelSetting/ParcelSettingIndex.vue"),
        name: "parcel-setting",
        meta: {
          title: "Parcel Configuration",
        },
      },
      {
        path: "shipment-settings",
        component: () =>
          import("../views/Settings/ShipmentSetting/ShipmentSettingIndex.vue"),
        name: "shipment-setting",
        meta: {
          title: "Shipment Configuration",
        },
      },
      {
        path: "label-settings",
        component: () =>
          import("../views/Settings/LabelSetting/LabelSettingIndex.vue"),
        name: "label-setting",
        meta: {
          title: "Label Settings",
        },
      },
      {
        path: "unit-settings",
        component: () =>
          import("../views/Settings/UnitSetting/UnitSettingIndex.vue"),
        name: "unit-setting",
        meta: {
          title: "Units & Currency",
        },
      },
    ],
  },
];

export default { routes };

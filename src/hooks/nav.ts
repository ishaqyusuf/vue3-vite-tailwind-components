import { Actions } from "@/use/user/actions";

const createMenu = (
  title,
  to,
  permission: Actions = null,
  css = "",
  children: any = null
) => {
  return {
    title,
    to,
    css,
    permission: permission,
    children,
  };
};

const parcel = createMenu("Parcel", { name: "parcels" }, "readPkg", "");
const dashboard = createMenu("Dashboard", { name: "dashboard" }, "readDb", "");
const customer = createMenu("Customer", { name: "customers" }, "readUser", "");
const roles = createMenu("Roles", { name: "roles" }, "readRole", "");
const dept = createMenu("Departments", { name: "dashboard" }, "readDept");
const employees = createMenu(
  "Employees",
  { name: "employees" },
  "readAgent",
  ""
);
const shipment = createMenu(
  "Shipment",
  { name: "shipments" },
  "readShipment",
  ""
);
const hrm = createMenu("H.R.M", null, null, "tracking-tight", [
  customer,
  employees,
  roles,
]);
export default {
  avatarMenu: [
    [
      dashboard,
      parcel,
      createMenu("Scan Parcel", { name: "scanner" }, "createPkg"),
      shipment,
    ],
    [
      createMenu("Profile", { name: "dashboard" }),
      createMenu("Settings", { name: "dashboard" }, "readAdmin"),
    ],
    [employees, customer, roles, dept],
    [createMenu("Logout", { name: "logout" }, null, "hover:bg-red-500")],
  ],
  menu: [
    dashboard,
    parcel,
    shipment,
    hrm,
    // Object.assign(customer, { css: "hidden lg:block" }),
    // Object.assign(employees, { css: "hidden lg:block" }),
  ],
};

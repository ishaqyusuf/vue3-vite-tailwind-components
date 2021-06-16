import { Actions } from "@/use/user-account/actions";

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
const customer = createMenu(
  "Customer",
  { name: "users", params: { mode: "clients" } },
  "readUser",
  ""
);
const roles = createMenu("Roles", { name: "roles" }, "readRole", "");
const dept = createMenu("Departments", { name: "dashboard" }, "readDept");
const invoice = createMenu("Invoice", { name: "invoices" }, "readInvoice");
const employees = createMenu(
  "Employees",
  { name: "users", params: { mode: "employees" } },
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
      invoice,
    ],
    [
      createMenu("Profile", { name: "dashboard" }),
      createMenu("Settings", { name: "settings" }),
    ],
    [employees, customer, roles, dept],
    [createMenu("Sign Out", { name: "logout" }, null, "hover:bg-red-500")],
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

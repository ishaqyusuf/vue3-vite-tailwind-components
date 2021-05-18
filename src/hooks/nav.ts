import { Actions } from "@/use/user/actions";
import user from "@/use/user";

const createMenu = (title, to, permission: Actions, css, children = null) => {
  return {
    title,
    to,
    css,
    permission: true, //!permission || user.can(permission),
    children,
  };
};

const parcel = createMenu("Parcel", { name: "parcels" }, "readPkg", "");
const dashboard = createMenu("Dashboard", { name: "dashboard" }, "readDb", "");
const customer = createMenu("Customer", { name: "customers" }, "readUser", "");
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
export default {
  menu: [
    parcel,
    dashboard,
    shipment,
    Object.assign(customer, { css: "hidden lg:block" }),
    Object.assign(employees, { css: "hidden lg:block" }),
  ],
};

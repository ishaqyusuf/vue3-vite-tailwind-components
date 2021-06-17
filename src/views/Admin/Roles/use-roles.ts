const crud: any[] = ["create", "read", "update", "delete"];
function initializeRoleTable(actions: any[] = []) {
  return rolesObject().map((ro) => {
    let permissions: any = {};
    crud.map((crud, index) => {
      let val = ro.id + (index + 1) / 10;
      let permit = actions.includes(val) || actions.includes(Math.floor(val));
      permissions[crud] = permit;
    });
    ro.action = permissions;
    ro.all = Object.values(permissions).every(Boolean);
    return ro;
  });
}
function rolesObject(): { id; title; can; action?; all?: boolean }[] {
  return roles.map((r) => {
    const [id, title, can] = r;
    return { id, title, can };
  });
}
function extractActions(items: { id; title; can; action?; all?: boolean }[]) {
  let actions: any[] = [];
  items.map((item) => {
    if (item.all) actions.push(item.id);
    else {
      crud.map((c, i) => {
        item.action[c] && actions.push(item.id + (1 + i / 10));
      });
    }
  });
  return actions;
}
const roles = [
  [1, "Parcel Manager", "Pkg"],
  [11, "Parcel Label", "Label"],
  [15, "Tracking Manager", "Track"],
  [2, "Customer Manager", "User"],
  [3, "Shipment Route Manager", "Route"],
  [4, "Shipment Process Manager", "Shipment"],
  [5, "Employees Manager", "Agent"],
  [6, "Roles Manager", "Role"],
  [7, "Notification Manager", "Alert"],
  [9, "General Settings", "General"],
  [8, "Admin Settings Manager", "Admin"],
  [12, "Dashboard", "Db"],
  [10, "Department Manager", "Dept"],
  [13, "Parcel Configuration", "ParcelConfig"],
  [16, "Label Configuration", "LabelConfig"],
  [14, "Invoice Configuration", "InvoiceConfig"],
  [17, "Accounting & Invoice", "Invoice"],
];

export default {
  extractActions,
  list: roles,
  objects: rolesObject,
  initializeRoleTable,
};

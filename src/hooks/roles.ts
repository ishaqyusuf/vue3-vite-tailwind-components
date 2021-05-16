import roleList from "./role-list";
import { computed } from "Vue";

const spreadRole = (role) => {
  var _spread = {};
  if (role) {
    role.admin = role.super_manager || role.director;
    roleObjects.value.map((ro) => {
      ["create", "read", "update", "delete"].map((action, i) => {
        var id = Number(ro.id) + (i + 1) / 10;
        // let val = r.id + (i + 1) / 10;
        _spread[[action, ro.action].join("")] =
          role.admin || role.actions?.some((a) => a == id || ro.id == a);
      });
    });
  }
  return _spread;
};
const roleObjects = computed(() =>
  roleList.roles.map((r) => {
    let m: any = {
      id: r[0],
      title: r[1],
      action: r[2],
    };
    return m;
  })
);
export default {
  spreadRole,
  roleObjects,
  ...roleList,
};

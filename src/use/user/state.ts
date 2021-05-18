import { ref, computed } from "vue";
import storage from "@utils/localStorage";
import userApi from "./api";
// import roleHook from "@/hooks/roles";
import { Actions } from "./actions";
import roleList from "@/hooks/role-list";
import router from "@/router";

const spreadRole = (role) => {
  var _spread = {};
  var _ls: any[] = [];
  if (role) {
    role.admin = role.super_manager || role.director;
    var ro = roleObjects.value;
    // var ro: any = [];
    ro.map((ro) => {
      ["create", "read", "update", "delete"].map((action, i) => {
        var id = Number(ro.id) + (i + 1) / 10;
        // let val = r.id + (i + 1) / 10;
        let grant =
          role.admin || role.actions?.some((a) => a == id || ro.id == a);
        let _action = [action, ro.action].join("");
        _spread[_action] = grant;
        grant && _ls.push(_action);
      });
    });
  }
  return _ls;
  // return _spread;
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
const user = ref({});
const token = ref(null);
const permission = ref<any[]>([]);

const loggedIn = computed(() => token.value != null);
const loadToken = () => {
  let _token = storage.get("authorized_user_token");
  if (_token) {
    token.value = _token;
  }
};
const getToken = () => {
  loadToken();
  return token.value;
};
const saveToken = (tok) => {
  storage.set("authorized_user_token", tok);
  loadToken();
};
const initializeUser = (token, _user) => {
  user.value = _user;
  permission.value = spreadRole(_user.role);
  saveToken(token);
};
const authenticate = async () => {
  loadToken();
  return new Promise<Boolean>((resolve, reject) => {
    if (!token.value) return resolve(false);
    return userApi.login({}, null, true).then(({ error }) => {
      if (error) {
        logout();
        router.push({ name: "login" });
      }
    });
  });
};
const logout = async () => {
  await userApi.logout();
  storage.remove("authorized_user_token");
  token.value = null;
  user.value = {};
  permission.value = [];
};
export default {
  token,
  getToken,
  user,
  authenticate,
  initializeUser,
  logout,
  loggedIn,
  permission,
  isCustomer: computed(() => permission.value.length == 0),
  can: (action: Actions) => permission.value.includes(action),
};

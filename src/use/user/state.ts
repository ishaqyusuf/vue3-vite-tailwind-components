import { ref, computed } from "vue";
import storage from "@utils/localStorage";
import userApi from "./api";
const user = ref({});
const token = ref(null);

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
  user.value = user;
  saveToken(token);
};
const authenticate = async () => {
  loadToken();
  return new Promise<Boolean>((resolve, reject) => {
    if (!token.value) return resolve(false);
    return userApi.validate(token.value).then((data) => {});
  });
};
const logout = async () => {
  storage.remove("authorized_user_token");
  token.value = null;
  user.value = {};
};
export default {
  token,
  getToken,
  user,
  authenticate,
  initializeUser,
  logout,
  loggedIn,
};

import { ref } from "vue";
import storage from "@utils/localStorage";
import userApi from "./api";
const user = ref({});
const token = ref(null);

const loadToken = () => {
  let _token = storage.get("authorized_user_token");
  if (_token) {
    token.value = _token;
  }
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
    if (!token) return resolve(false);
    return userApi.validate(token).then((data) => {});
  });
};
export default {
  token,
  user,
  authenticate,
  initializeUser,
};

import { Actions } from "./actions";
import roles from "@/hooks/roles";
import user from "./state";
import { ref } from "Vue";
const initialized = ref(false);
const permission = ref({});
export default {
  can: (action: Actions) => {
    if (!initialized.value) permission.value = roles.spreadRole(user.user);
    return user.permission.value[action];
  },
};

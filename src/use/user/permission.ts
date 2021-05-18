import { Actions } from "./actions";
import roles from "@/hooks/roles";
import user from "./state";
import { ref } from "Vue";
const initialized = ref(false);
const _permission = ref({});
export default function () {
  can: (action: Actions) => {
    if (!initialized.value) _permission.value = roles.spreadRole(user.user);
    return user.permission.value[action];
  };
}

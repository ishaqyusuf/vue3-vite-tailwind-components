import lifecycle from "./lifecycle";
import crud from "./api";
import state from "./state";
import permission from "./permission";
export default {
  ...lifecycle,
  ...crud,
  ...state,
  ...permission,
};

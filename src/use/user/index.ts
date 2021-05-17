import lifecycle from "./lifecycle";
import crud from "./api";
import state from "./state";
export default {
  ...lifecycle,
  ...crud,
  ...state,
};

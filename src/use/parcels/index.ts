import lifecycle from "./lifecycle";
import crud from "./api";
import state from "./state";
import parcel from "./parcel";

export default {
  ...lifecycle,
  ...crud,
  ...state,
  ...parcel,
};

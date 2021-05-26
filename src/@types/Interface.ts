import { Ref } from "@vue/reactivity";

export interface Phone {
  code?: string;
  no?: string;
}
export interface Recipient {
  address?: string;
  avatar?: string;
  country?: string;
  office_id?: number;
  email?: string;
  full_name?: string;
  id?: string;
  name?: string;
  phone?: Phone;
  sort_name?: string;
  state?: string;
  city?: string;
}
export interface User {
  first_name?: string;
  last_name?: string;
  email?: string;
  department_id?: number;
  role_id?: number;
  password?: string;
}
export interface Parcel {
  created_at?: string;
  department_id?: string;
  description?: string;
  dimension?: string;
  dimension_unit?: string;
  courier?: string;
  group_id?: string;
  height?: string;
  id?: number;
  length?: string;
  recipient?: Recipient;
  shipment_id?: number;
  storage_id?: number;
  status?: string;
  track_code?: string;
  weight?: string;
  weight_unit?: string;
  width?: string;
}
export interface Tracking {
  content?: string;
  location?: string;
  created_at?: string;
  id?: number;
  status?: string;
  secondary?: string;
  track_code?: string;
}
export interface TrackingResult {
  in_system?: any;
  default_status?;
  trackings?: Tracking[];
  parcel?: Parcel;
  error?: any;
}

export interface TableStructure {
  name: string;
  title: string;
  fontMedium?: boolean;
  btnProps?: object;
  btnLink?: boolean;
}
export interface TableWorker {
  toggleAll?;
  checkAll?;
  extendedItems?;
  updateItem?;
  setCheckedItemsById?;
  unshift?;
  push?;
  initialize?;
  refresh?;
  data?;
  ids?: Ref<number[]>;
  items?: Ref<any[]>;
  itemByIds?: Ref<{ [id in number]: any }>;
  checkedIds?: Ref<number[]>;
  reset?;
  clearChecks?;
  deleteItem?;
  deleteMany?;
  loading?: Ref<boolean>;
  deleteSelection?;
}

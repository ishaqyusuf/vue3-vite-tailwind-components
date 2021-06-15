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
  items?: Tracking[];
  parcel?: Parcel;
  error?: any;
}
export interface TableStructure {
  name: string;
  title?: string;
  fontMedium?: boolean;
  btnProps?: object;
  btnLink?: boolean;
  td?: boolean;
  computed?: any;
}
export interface IUseList {
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
  itemsById?: Ref<{ [id in number]: any }>;
  checkedIds?: Ref<number[]>;
  reset?;
  clearChecks?;
  deleteItem?;
  deleteMany?;
  loading?: Ref<boolean>;
  deleteSelection?;
}
export interface Shipment {
  active?;
  active_until?;
  archived_at?;
  automatic?;
  created_at?;
  end_date?;
  id?;
  prefix?;
  shipment_id?;
  shipment_route_id?;
  slug?;
  start_date?;
  status?;
  title?;
  track_code?;
}
export interface ShipmentMeta {
  date?;
  date_range?: Boolean;
  dates?: any[];
  from_date?: string;
  inactive_after_date?: string;
  inactive_after_parcel_count?: number;
  include_archived?;
  include_storage?;
  mutliple_date?: Boolean;
  statuses?: any[];
  to_date?;
}
export interface ShipmentRoute {
  created_at?: string;
  id?: number;
  next_index?: number;
  start_index?: number;
  prefix?: string;
  slug?: string;
  status?: string;
  start_date?: string;
  end_date?: string;
  title?: string;
  free_indices?: number;
}
export interface ShipmentOverview {
  meta?: ShipmentMeta;
  parcels?;
  route?: ShipmentRoute;
  shipment?: Shipment;
}
export interface ApiReqOptions {
  success?: String;
  error?: String;
  showError?: Boolean;
  cache?: Boolean;
  deepCache?: Boolean;
  onSuccess?: Function;
}
export interface ApiOptions {
  form?: any;
  data?: any;
}

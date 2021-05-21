export interface Phone {
  code?: string;
  no?: string;
}
export interface Recipient {
  address?: string;
  avatar?: string;
  country?: string;
  email?: string;
  full_name?: string;
  id?: string;
  name?: string;
  phone?: Phone;
  sort_name?: string;
  state?: string;
}
export interface Parcel {
  created_at?: string;
  department_id?: string;
  description?: string;
  dimension_unit?: string;
  group_id?: string;
  height?: string;
  id?: string;
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
  track_code?: string;
}
export interface TrackingResult {
  trackings?: Tracking[];
  parcel?: Parcel;
  error?: any;
}

import { useBaseApi } from "./use-base-api";

export default {
  ...useBaseApi("meta"),
};
export enum MetaDataType {
  DefaultAddress = "default_address",
}

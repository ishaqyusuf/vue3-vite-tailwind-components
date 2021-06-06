import { Shipment, ShipmentOverview, ShipmentRoute } from "@/@types/Interface";
import useShipmentsApi from "@/use/api/use-shipments-api";
import { ref } from "vue";

const overview = ref<ShipmentOverview>({});
const shipment = ref<Shipment>({});
const shipmentRoute = ref<ShipmentRoute>({});
const loading = ref(true);
const stylus = ref<any>({});
const slug = ref();

const statusList = ["Active", "Inactive", "Completed", "Cancel", "Draft"];
function initialize(_slug) {
  slug.value = _slug;
  loading.value = true;
  useShipmentsApi.get(_slug).then((data) => {
    refresh(data);
  });
}
function refresh(data) {
  shipment.value = data.shipment ?? {};
  overview.value = data;
  shipmentRoute.value = data.route ?? {};
  const status = shipment.value.status;
  const statsColor = {
    Active: "yellow",
    Completed: "green",
    Cancelled: "red",
  };
  stylus.value.status_color = statsColor[status] ?? "gray";
  loading.value = false;
}
export default {
  statusList,
  loading,
  stylus,
  shipment,
  slug,
  overview,
  shipmentRoute,
  initialize,
  refresh,
};

import { Shipment, ShipmentOverview, ShipmentRoute } from "@/@types/Interface";
import useShipmentsApi from "@/use/api/use-shipments-api";
import { ref } from "vue";

export function useShipmentOverview(props, list) {}

const overview = ref<ShipmentOverview>({});
const shipment = ref<Shipment>({});
const shipmentRoute = ref<ShipmentRoute>({});
const loading = ref(true);
const stylus = ref<any>({});
function initialize(slug) {
  loading.value = true;
  useShipmentsApi.get(slug).then((data) => {
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
  });
}
export default {
  loading,
  stylus,
  shipment,
  overview,
  shipmentRoute,
  initialize,
};

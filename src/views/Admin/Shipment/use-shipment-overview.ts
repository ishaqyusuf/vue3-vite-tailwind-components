import { Shipment, ShipmentOverview, ShipmentRoute } from "@/@types/Interface";
import useMetaLoader from "@/use/api/use-meta-loader";
import useShipmentsApi from "@/use/api/use-shipments-api";
import useStatusColor from "@/use/data/use-status-color";
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

  stylus.value.status_color = useStatusColor.getColor(
    status,
    useMetaLoader.shipmentStatus.value,
    "gray"
  );
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

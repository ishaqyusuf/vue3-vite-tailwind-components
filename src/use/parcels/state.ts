import { ref, toRefs, computed, reactive } from "vue";
import api from "./api";
import alert from "@/hooks/alert";
import user from "@/use/user";
const items = ref<any[]>([]);
const pager = ref(null);
const query = ref();
const loading = ref(false);
const init = (_query = null) => {
  loading.value = true;
  query.value = _query ?? {};
  api.fetchMany(query).then((data) => {
    const { items, pager } = data;
    items.value = items;
    pager.value = pager;
    loading.value = false;
  });
};
const deleteParcels = (parcels) => {
  const ids = parcels.map((p) => p.id);
  api.deleteMany(ids).then((data) => {
    items.value = items.value.filter((v) => !ids.includes(v.id));
    alert.register("Selected items has been deleted");
  });
};
const transform = (item, data) => {
  let details: any[] = [
    { value: item.weight_str, style: "blue" },
    { value: item.courier, style: "purple" },
  ];
  item.shipment &&
    details.push({
      value: item.shipment.prefix,
      style: "green",
      to: user.can("readShipment") && {
        name: "shipment-editor",
        params: {
          slug: item.shipment.slug,
        },
      },
    });
  data.details = details.filter((f) => f.value);
  data.to = {
    name: "parcel-overview",
    params: {
      slug: item.track_code,
    },
  };
  return data;
};
export default {
  init,
  loading,
  items,
  pager,
  deleteParcels,
  transform,
};

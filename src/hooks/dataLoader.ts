import { reactive, ref, toRefs } from "vue";
import { $clientApi } from "@/core/services/client";
import { $dev } from "@/core/utils/functions";

const couriers = ref<string[]>([]);
const loaded = reactive({
  courier: false,
});
const data = reactive({
  courierLoaded: false,
  couriers: [],
  locationLoaded: false,
  locations: [],
});
const getSomething = async (what) => {
  return new Promise<never[]>((resolve, reject) => {
    $clientApi
      .get(what)
      .then((response) => {
        const { items } = response.data;
        resolve(items as never[]);
      })
      .catch((e) => {
        $dev.error(e);
        resolve([]);
      });
  });
};
const initCouriers = async () => {
  if (!data.courierLoaded) {
    getSomething("/couriers").then((items) => {
      data.couriers = items;
      loaded.courier = true;
    });
  }
};
const initLocations = async () => {
  if (!data.locationLoaded) {
    getSomething("/locations").then((items) => {
      data.locations = items;
      data.locationLoaded = true;
    });
  }
};
const updateCouriers = (value) => {
  !couriers.value.includes(value) && couriers.value.push(value);
};

export default {
  initLocations,
  initCouriers,
  updateCouriers,
  ...toRefs(data),
};

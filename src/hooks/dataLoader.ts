import { reactive, ref } from "vue";
import { $clientApi } from "@/core/services/client";
import { $dev } from "@/core/utils/functions";

const couriers = ref<string[]>([]);
const loaded = reactive({
  courier: false,
});
const initCouriers = async () => {
  if (!loaded.courier) {
    $clientApi
      .get("/couriers")
      .then((response) => {
        const { items } = response.data;
        couriers.value = items;
        loaded.courier = true;
      })
      .catch((e) => {
        $dev.error(e);
      });
  }
};
const updateCouriers = (value) => {
  !couriers.value.includes(value) && couriers.value.push(value);
};

export default {
  couriers,
  initCouriers,
  updateCouriers,
};

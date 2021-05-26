import { $clientApi } from "@/core/services/client";
import { ref } from "vue";
import qs from "qs";
import useAddress from "./useAddress";
const roles = ref([]);

const loaded = ref(false);

const loadRoles = async () => {
  if (!loaded.value) {
    const query = qs.stringify({ simple: true });
    const { data } = await $clientApi.get("roles?" + query);
    loaded.value = true;
    roles.value = data.items;
  }
};
const addressLoaded = ref(false);
const addresses = ref([]);
const loadAddress = async () => {
  if (!addressLoaded.value) {
    const query = { department: true, all_books: true };
    const items = await useAddress.getAddreses(query);
    addressLoaded.value = true;
    addresses.value = items;
  }
};
export default {
  roles,
  loadRoles,
  addresses,
  loadAddress,
  loaded,
};

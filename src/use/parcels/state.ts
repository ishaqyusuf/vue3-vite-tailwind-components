import { ref, toRefs, computed, reactive } from "vue";
import api from "./api";

const items = ref<any[]>([]);
const pager = ref(null);
const query = ref();
const loading = ref(false);
const init = (_query = null) => {
  loading.value = true;
  query.value = _query ?? {};
  api.fetchParcels(query).then((data) => {
    const { items, pager } = data;
    items.value = items;
    pager.value = pager;
    loading.value = false;
  });
};
export default {
  init,
  loading,
  items,
  pager,
};

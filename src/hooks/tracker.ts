import { ref, reactive, computed } from "vue";
import { $clientApi } from "@services/client";
import { $dev } from "@/core/utils/functions";

const trackCode = ref("");

const loading = ref(false);

const result = ref({});

const search = async (code) => {
  trackCode.value = code;
  loading.value = true;
  try {
    const response = await $clientApi.get(`tracking/${code}`);
    const { data } = response;
    result.value = data;
  } catch (error) {
    $dev.error(error);
  }
  loading.value = false;
  $clientApi
    .get("tracking")
    .then((data) => {})
    .catch((error) => $dev.error(error));
};

export default {
  trackCode,
  result,
  isLoading: computed(() => loading.value),
  search,
};

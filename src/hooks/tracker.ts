import { ref, reactive, computed } from "vue";
import { $clientApi } from "@services/client";
import { $dev } from "@/core/utils/functions";

const trackCode = ref("");

const loading = ref(false);

const result: any = ref({});

const search = async (code) => {
  trackCode.value = code;
  loading.value = true;
  try {
    const response = await $clientApi.get(`tracking/${code}`);
    const { data } = response;
    result.value = data;
    console.log(data);
  } catch (error) {
    $dev.error(error);
  }
  loading.value = false;
};

export default {
  trackCode,
  result,
  isLoading: computed(() => loading.value),
  parcel: computed(() => result.value.parcel),
  trackings: computed(() => result.value.trackings),
  noResult: computed(() => !loading.value && result.value.error),
  search,
};

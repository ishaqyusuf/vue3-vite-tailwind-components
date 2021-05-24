import { ref, reactive, computed } from "vue";
import { $clientApi } from "@services/client";
import { $dev } from "@/core/utils/functions";
import { TrackingResult } from "@/@types/Interface";
const trackCode = ref("");

const loading = ref(false);

const result = ref<TrackingResult>({});

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
};
const save = async (form) => {
  return new Promise((resolve, reject) => {
    // $clientApi.

    const url = ["/tracker", form.id].filter(Boolean).join("/");
    const data = { data: form };
    const req = form.id
      ? $clientApi.patch(url, data)
      : $clientApi.post(url, data);
    req
      .then((response) => {
        const { data } = response;
        var msg = data.error;
        const error = msg != null;
        if (!error) {
          msg = "Saved!.";
          var trackings = result.value.trackings;
          if (!trackings) trackings = [];
          const index = trackings?.findIndex((t) => t.id == data.id) ?? -1;
          if (index > -1) trackings[index] = data;
          else trackings.push(data);
        }
        resolve({
          msg,
          error,
        });
      })
      .catch((error) => {
        resolve({
          msg: "Something went wrong! Try again",
          error: true,
        });
      });
  });
};

export default {
  trackCode,
  save,
  result,
  isLoading: computed(() => loading.value),
  parcel: computed(() => result.value.parcel),
  noResult: computed(() => !loading.value && result.value.error),
  search,
};

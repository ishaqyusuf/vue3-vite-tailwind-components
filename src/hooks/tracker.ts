import { ref, computed } from "vue";
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
    console.log(data);
    result.value = data;
    loading.value = false;
    return data;
  } catch (error) {
    $dev.error(error);
  }
  loading.value = false;
  return null;
};
const remove = async (id) => {
  const { data } = await $clientApi.delete(`/tracker/${id}`);
  return data;
};
const update = async (form) => {
  const url = ["/tracker", form.id].filter(Boolean).join("/");
  const data = { data: form };
  const req = form.id
    ? $clientApi.patch(url, data)
    : $clientApi.post(url, data);
  return req;
};
const save = async (form, then: any = null) => {
  return new Promise((resolve, reject) => {
    // $clientApi.
    update(form)
      .then((response) => {
        const { data } = response;
        then && then(data);
        var msg = data.error;
        const error = msg != null;
        if (!error) msg = "Saved!.";
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
  remove,
  loading,
  parcel: computed(() => result.value.parcel),
  noResult: computed(() => !loading.value && result.value.error),
  search,
};

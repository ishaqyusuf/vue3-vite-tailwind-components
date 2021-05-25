import { Parcel } from "@/@types/Interface";
import alert from "@/hooks/alert";
import { ref } from "vue";
import api from "./api";

const slug = ref("");
const isLoading = ref(false);
const data = ref<Parcel>({});
const initParcelOverview = (_slug) => {
  isLoading.value = true;
  slug.value = _slug;
  api
    .fetchOne(slug.value, {
      parcel_mode: true,
    })
    .then((_data) => {
      data.value = _data;
      isLoading.value = false;
      initParcelView();
    });
};
const updateParcel = async (track_code, form) => {
  const result = await api.updateOne(track_code, {
    data: form,
    parcel_mode: true,
  });
  if (!result.error) {
    data.value = {
      ...data.value,
      ...result,
    };
    alert.register("Data updated");
    return true;
  } else alert.register(result.error, true);
  return false;
};
const initParcelView = () => {
  const {
    length,
    width,
    weight,
    weight_unit,
    height,
    dimension_unit,
    track_code,
    courier,
    description,
  } = data.value;
  console.log(description);
  parcelView.value = [
    // ["Track Code", track_code],
    ["Courier", courier],
    ["Weight", [weight, weight_unit].filter(Boolean).join(" ")],
    [
      "Dimension",
      [
        [length, width, height]
          .filter((v) => (!v ? "-" : v))
          .join("* ")
          .trim(),
        dimension_unit,
      ].join(" "),
    ],
    ["Description", description],
  ].map((arr) => {
    return {
      title: arr[0],
      value: arr[1]?.trim() ?? "-",
    };
  });
};
const parcelView = ref<any[]>();
export default {
  parcelView,
  initParcelView,
  initParcelOverview,
  isLoading,
  parcel: data,
  ...api,
  updateParcel,
};

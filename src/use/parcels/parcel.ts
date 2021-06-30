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
const updateParcel = async (
  form,
  track_code = null,
  list: any = null,
  first = false
) => {
  const result = await api.updateOne(track_code ?? data.value.track_code, {
    data: form,
    parcel_mode: true,
  });
  if (!result.error) {
    if (!track_code)
      data.value = {
        ...data.value,
        ...result,
      };
    alert.register("Data updated");
    list && list.updateItem(result.id, result, first);
    return track_code ? result : true;
  } else alert.register(result.error, true);
  return false;
};
const updateParcelRecipient = async (
  track_code,
  user,
  list: any = null,
  first = false
) => {
  const result = await updateParcel(
    { to_address_id: user.id },
    track_code,
    list,
    first
  );
  return result;
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
  updateParcelRecipient,
};

import { ref } from "vue";
import parcel from "./parcels/parcel";
export async function useLabelComposer(track_code) {
  const _parcel = ref();
  const item = ref();
  const data = ref();

  function getRecipient() {
    return _parcel.value?.recipient ?? {};
  }
  function getDimension() {
    const { length, width, height, dimension_unit } = _parcel.value;
    var arr = [length, width, height].filter(Boolean);
    if (arr.length < 3) return "-";
    return [arr.join("x"), dimension_unit].filter(Boolean).join(" ");
  }
  function getWeight() {
    let val = ["weight", "weight_unit"].map(
      (k) => _parcel.value && _parcel.value[k]
    );
    if (!val[0]) return "-";
    return val.filter(Boolean).join(" ");
  }
  function getOnHandId() {
    return [getRecipient()?.sort_name, _parcel.value?.id]
      .filter(Boolean)
      .join("");
  }
  const init = () => {
    _parcel.value = item.value;
    data.value = {
      _parcel: _parcel.value,
      recipient: getRecipient(),
      dimension: getDimension(),
      weight: getWeight(),
      onHandId: getOnHandId(),
    };
  };
  const _item = await parcel.fetchOne(track_code, { label_mode: true });
  if (_item) return null;

  init();
  return {
    parcel: parcel,
    data,
  };
}

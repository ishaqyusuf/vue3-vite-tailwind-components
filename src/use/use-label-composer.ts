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
  function composeClient() {
    const recipient = getRecipient();
    let cs = [recipient.state, recipient.country].filter(Boolean);
    let val = cs.length == 2 && cs.join(" State, ");
    let phone = recipient.phone;
    return [
      { value: recipient.full_name ?? recipient.name, style: "" },
      {
        value: [phone?.code, phone?.no].filter(Boolean).join(" "),
        style: "",
      },
      { value: recipient.address_1, style: "" },
      {
        value: val,
        style: "font-bold text-base py-1",
      },
    ].filter((s) => s.value);
  }
  function composeCompany() {
    let address = _parcel.value.company ?? {};
    return [
      { value: address.name, style: "font-bold" },
      { value: address.address_1, style: "text-xs tracking-widest" },
      {
        value: [address.state, address.country].filter(Boolean).join(","),
        style: "",
      },
    ].filter((v) => v.value);
  }
  const init = () => {
    _parcel.value = item.value;
    data.value = {
      parcel: _parcel.value,
      recipient: getRecipient(),
      dimension: getDimension(),
      weight: getWeight(),
      onHandId: getOnHandId(),
      composer: {
        client: composeClient(),
        company: composeCompany(),
      },
    };
  };
  item.value = await parcel.fetchOne(track_code, { label_mode: true });
  if (!item.value) return null;

  init();
  return {
    parcel: _parcel,
    data,
  };
}

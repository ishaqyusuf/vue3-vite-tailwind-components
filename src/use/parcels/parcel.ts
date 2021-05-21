import { Parcel } from "@/@types/Interface";
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
      // console.log(_data);
      isLoading.value = false;
      initParcelView();
    });
};
const initParcelView = () => {};
export default {
  initParcelOverview,
  isLoading,
  parcel: data,
};

import { $clientApi } from "@/core/services/client";
import { $dev } from "@/core/utils/functions";
import qs from "qs";
import { ref } from "vue";

export function useGeo() {
  const country = ref<any>({});

  const countries = ref([]);
  const states = ref([]);
  const cities = ref([]);
  const options = ref<GeoOptions>({});
  const countryChanged = ref<any>();
  const get = async (url) => {
    try {
      const response = await $clientApi.get(url);
      const { data } = response;
      return data;
    } catch (error) {
      $dev.error(error);
    }
    return {};
  };
  const countryChange = async (_country, state = null) => {
    const q = { country: _country, no_state: options.value.noState };
    const url = `/geodata?${qs.stringify(q)}`;
    const { items, data } = await get(url);
    data.country = _country;
    const { phonecode } = data;
    data.code = [phonecode && "+", phonecode].filter(Boolean).join("");
    country.value = data;
    countryChanged.value && countryChanged.value(data);
    if (options.value.noState) return;
    states.value = items;
    cities.value = [];
    if (state) stateChange(state);
  };
  const stateChange = async (_state) => {
    if (options.value.noCity) return;
    const url = `/geodata?${qs.stringify({
      country: country.value?.country,
      state: _state,
    })}`;
    const { items } = await get(url);
    cities.value = items;
  };
  return {
    countries,
    states,
    cities,
    country,
    initialize: (
      { country = null, state = null, city = null, opts = {} },
      onCountryChanged: any = null
    ) => {
      countryChanged.value = onCountryChanged;
      options.value = opts;
      get("/geodata").then((data) => {
        countries.value = data.items;
        if (country) countryChange(country, state);
      });
    },
    countryChange,
    stateChange,
  };
}
export interface GeoOptions {
  noState?: Boolean;
  noCity?: Boolean;
}

import { $clientApi } from "@/core/services/client";
import { $dev } from "@/core/utils/functions";
import qs from "qs";
import { ref } from "vue";

export function geo() {
  const country = ref<any>({});

  const countries = ref([]);
  const states = ref([]);
  const cities = ref([]);

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
    const url = `/geodata?${qs.stringify({ country: _country })}`;
    const { items, data } = await get(url);
    states.value = items;
    cities.value = [];
    data.country = _country;
    country.value = data;
    if (state) stateChange(state);
  };
  const stateChange = async (_state) => {
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
    initialize: (country, state, city) => {
      get("/geodata").then((data) => {
        countries.value = data.items;
        if (country) countryChange(country, state);
      });
    },
    countryChange,

    stateChange,
  };
}

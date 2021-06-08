import { $clientApi } from "@/core/services/client";
import { $dev } from "@/core/utils/functions";
import useSmartApi from "@/use/api/use-smart-api";
import qs from "qs";
import { ref } from "vue";

export function useGeo() {
  const country = ref<any>({});

  const countries = ref([]);
  const states = ref([]);
  const cities = ref([]);
  const options = ref<GeoOptions>({});
  const countryChanged = ref<any>();
  const get = async (query = {}) => {
    try {
      const data = await useSmartApi.request("get", "geodata", query, {
        cache: true,
        deepCache: true,
      });
      return data;
    } catch (error) {
      $dev.error(error);
    }
    return {};
  };
  const countryChange = async (_country, state = null) => {
    if (!_country) return;
    const q = { country: _country, no_state: options.value.noState };
    const { items, data } = await get(q);
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
    const { items } = await get({
      country: country.value?.country,
      state: _state,
    });
    cities.value = items;
  };
  return {
    countries,
    states,
    cities,
    country,
    initialize: (
      form: any = {},
      opts: GeoOptions = {},
      onCountryChanged: any = null
    ) => {
      countryChanged.value = onCountryChanged;
      options.value = opts;
      get().then((data) => {
        countries.value = data.items;
        if (form.country && !opts.noState)
          countryChange(form.country, form.state);
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

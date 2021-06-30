<template>
  <div>
    <Prompt
      v-model="show"
      @closed="formClosed"
      cancelable
      hide-cancel
      ok="Save"
      ok-action="save"
      title="Client Data"
    >
      <template #info>
        <div class="space-y-2">
          <div
            class="w-full px-4 py-2 bg-gray-100 inline-flex space-x-2 items-center"
          >
            <Menu>
              <Input
                dense
                class="w-full"
                v-model="search"
                placeholder="Search address"
              />
              <template #items>
                <div class="divide-y flex flex-col px-4">
                  <SimpleMenuItem
                    @click="getAddress(client.id)"
                    plain
                    v-for="(client, index) in addressList"
                    :key="index"
                  >
                    <div class="inline-flex justify-between w-full">
                      <Truncify class="w-3/4"
                        ><Label>{{ client.name }}</Label></Truncify
                      >
                    </div>
                    <Truncify class="text-sm text-gray-500">
                      <span class="pr-1" v-if="client.address_1"
                        >{{ client.address_1 }},</span
                      >
                      <span>{{ client.state }}</span>
                    </Truncify>
                  </SimpleMenuItem>
                </div>
              </template>
            </Menu>
          </div>
          {{ form }}
          <div class="px-4">
            <Input
              name="full_name"
              v-model="form.name"
              v-if="vff.name"
              label="Name"
            />
            <Input
              name="email"
              v-model="form.email"
              v-if="vff.email"
              label="Email"
            />
            <Input
              name="country"
              label="Country"
              auto-complete
              v-if="vff.country"
              :items="geo.countries.value"
              @selected="geo.countryChange(form.country)"
              v-model="form.country"
            />
            <Input
              name="phone"
              label="Phone"
              v-if="vff.phone"
              :prefix="form.phone.code"
              v-model="form.phone.no"
            />
            <Input
              name="address_1"
              label="Street Address"
              v-if="vff.address_1"
              v-model="form.address_1"
            />
            <Input
              name="state"
              label="State"
              auto-complete
              :items="geo.states.value"
              v-if="vff.state"
              @selected="geo.stateChange(form.state)"
              v-model="form.state"
            />
            <Input
              name="city"
              label="City"
              v-if="vff.city"
              :items="geo.cities.value"
              combobox
              v-model="form.city"
            />
          </div>
        </div>
      </template>
    </Prompt>
  </div>
</template>

<script lang="ts">
import { loadTransformedClientForm } from "@/hooks/use-meta-adapter";
import { useGeo } from "@/hooks/useGeo";
import { useAddressApi } from "@/use/api/use-api";
import useDebouncedRef from "@/use/useDebounceRef";
import { ref, toRefs, watch } from "vue";

export default {
  props: {},
  setup(props, { emit }) {
    const show = ref(false);
    const search = useDebouncedRef("", 300, false);
    watch(search, (value, oldValue) => loadAddress());
    const addressList = ref<any[]>([]);
    const loadAddress = async () => {
      const { items, pager } = await useAddressApi.index({
        q: search.value,
        finder: true,
      });
      addressList.value = items;
    };
    const resolver = ref();
    const rejecter = ref<any>();

    const form = ref<any>({});
    //visible form fields
    const vff = ref<any>({});
    const dff = ref<any>({});
    const useDefault = ref(true);
    const openForm = (parcel, address_id = null, key = "to_address_id") => {
      return new Promise(async (resolve, reject) => {
        resolver.value = resolve;
        rejecter.value = reject;
        const ltc = await loadTransformedClientForm();
        if (!address_id) {
          form.value = ltc.data;
          vff.value = ltc.vff;
          dff.value = ltc.dff;
        } else await getAddress(address_id);
        show.value = true;
      });
    };
    const getAddress = async (id) => {
      const data = await useAddressApi.get(id);
      if (data) {
        form.value = data;
        initForm();
      }
    };
    const geo = useGeo();
    const initForm = () => {
      const { country, state, city } = form.value;
      geo.initialize(
        {
          country,
          state,
          city,
        },
        {},
        (country) => (form.value.phone.code = country.code)
      );
    };
    return {
      geo,
      useDefault,
      vff,
      getAddress,
      dff,
      addressList,
      form,
      search,
      openForm,
      show,
      formClosed: () => {},
    };
  },
};
</script>

<style scoped></style>

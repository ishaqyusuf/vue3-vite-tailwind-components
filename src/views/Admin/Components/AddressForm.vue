<template>
  <div>
    <template v-if="userForm">
      <Input name="" v-model="address.name" label="Name" />
      <Input name="" v-model="address.email" label="Email" />
    </template>
    <Input
      name="country"
      label="Country"
      auto-complete
      :items="geo.countries.value"
      @selected="geo.countryChange(address.country)"
      v-model="address.country"
    />
    <Input
      name="phone"
      label="Phone"
      :prefix="address.phone.code"
      v-model="address.phone.no"
    />
    <Input
      name="address_1"
      label="Street Address"
      v-model="address.address_1"
    />
    <Input
      name="state"
      label="State"
      auto-complete
      :items="geo.states.value"
      @selected="geo.stateChange(address.state)"
      v-model="address.state"
    />
    <Input
      name="city"
      label="City"
      :items="geo.cities.value"
      combobox
      v-model="address.city"
    />
  </div>
</template>

<script lang="ts">
import { useModelWrapper } from "@/use/modelWrapper";
import { useGeo } from "@/hooks/useGeo";
import { onMounted } from "vue";
export default {
  props: {
    userForm: Boolean,
    modelValue: Object,
  },
  setup(props, { emit }) {
    const geo = useGeo();
    const address = useModelWrapper(props, emit);

    onMounted(() => {
      const { country, state, city } = address.value;
      geo.initialize(
        {
          country,
          state,
          city,
        },
        {},
        (country) => (address.value.phone.code = country.code)
      );
    });
    return {
      address,
      geo,
    };
  },
};
</script>

<style scoped></style>

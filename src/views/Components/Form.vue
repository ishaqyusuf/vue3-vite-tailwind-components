<template>
  <Container>
    <div class="grid grid-cols-4 gap-10 w-full">
      <Input
        :items="useHrm.roles.value"
        v-model="role_id"
        item-text="title"
        item-value="id"
        name="role"
        select
        label="Role"
      ></Input>
      <!-- v-model="address.office_id" -->
      <Input
        select
        :items="useHrm.addresses.value"
        item-text="address_1"
        item-value="id"
        name="role"
        label="Address"
      ></Input>

      <Input label="Phone" :prefix="`+${geo.country.value.phonecode}`"></Input>
      <!-- v-model="address.phone.no" -->
      <Input
        label="Country"
        :items="geo.countries.value"
        @selected="geo.countryChange(address.country)"
        auto-complete
        v-model="address.country"
      ></Input>
      <Input
        auto-complete
        :items="geo.states.value"
        @selected="geo.stateChange(state)"
        v-model="address.state"
        label="State"
      ></Input>
      <Input
        v-model="address.city"
        auto-complete
        :items="geo.cities.value"
        label="City"
      ></Input>
      <div class="bg-black-700 p-2 rounded-lg">
        <Input
          prefix="NGN"
          v-model="input3"
          password
          dark
          label="Valued Input"
        ></Input>
      </div>
      <Input
        prefix="NGN"
        v-model="input3"
        password
        label="Valued Input: input3"
      ></Input>
      <Input v-model="input4" clearable label="Input"></Input>
      <Input
        v-model="input5"
        :items="items"
        auto-complete
        label="Auto Input"
      ></Input>
      <Input
        v-model="input7"
        :items="itemsObject"
        item-text="title"
        item-value="id"
        auto-complete
        label="Auto Input Object"
      ></Input>
      <Input
        v-model="input8"
        :items="itemsObject"
        item-text="title"
        select
        label="Auto Input Object 2: inpute8"
      ></Input>
      <Input v-model="input6" :items="couriers" select label="Select Input">
        <template #inner>Hello world</template>
      </Input>
      <Input v-model="input1" clearable label="Input"></Input>
      <Input v-model="input2" clearable label="Hello World"></Input>
      <Input :items="couriers" auto-complete clearable label="Courier"></Input>
      <div class="col-span-4">
        {{ inputs }}
      </div>
    </div></Container
  >
  <FormInput password type="password" label="Hello World"></FormInput>
  <FormInput :items="['a', 'b', 'c']" label="Hello World"></FormInput>
  <span>{{ input1 }}</span>
  <!-- <Input select tile :items="items" v-model="input1"></Input> -->
  <Btn :action="advance" async>Action Button</Btn>
  <Btn :action="action" async>Async Action Button</Btn>
</template>

<script lang="ts">
import { ref, onMounted, reactive, toRefs } from "vue";
import useTime from "@/hooks/time";
import loaderHook from "@/hooks/dataLoader";
import { useGeo } from "@/hooks/useGeo";
import { Recipient } from "@/@types/Interface";
import useHrm from "@/use/api/useHrm";
export default {
  props: {},
  setup(props, { emit }) {
    const address = reactive<Recipient>({});
    const inputs = reactive({
      country: "Nigeria",
      state: "",
      city: "",
      input1: "Hellos",
      input3: "Hellos",
      input4: "",
      input5: "",
      input6: "",
      input7: "",
      input8: {},
      input2: "",
      role_id: null,
      address_id: -1,
    });
    const action = async () => {
      await useTime.delay(3000);
    };
    const geo = useGeo();
    geo.initialize(address.country, address.state, address.city);
    onMounted(() => {
      useHrm.loadRoles();
      useHrm.loadAddress();
      // loaderHook.initCouriers().then((d) => {});
    });
    const advance = async () => {
      return new Promise(async (resolve, reject) => {
        useTime.delay(4000).then((r) => {
          resolve(true);
        });
      });
    };

    const finallys = () => {};
    return {
      address,
      useHrm,
      ...toRefs(inputs),
      inputs,
      advance,
      finallys,
      action,
      items: ref(
        Array(10)
          .fill(null)
          .map((item, index) => "Item l" + index)
      ),
      itemsObject: ref(
        Array(10)
          .fill(null)
          .map((item, index) => {
            return {
              id: index,
              title: "Item " + index,
            };
          })
      ),
      ...loaderHook,
      geo,
    };
  },
};
</script>

<style scoped></style>

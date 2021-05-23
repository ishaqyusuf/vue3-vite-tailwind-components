<template>
  <Container>
    <div class="grid grid-cols-4 gap-10 w-full">
      <ValidInput
        label="Country"
        :items="geo.countries.value"
        @selected="geo.countryChange(country)"
        auto-complete
        v-model="country"
      ></ValidInput>
      <ValidInput
        auto-complete
        :items="geo.states.value"
        @selected="geo.stateChange(state)"
        v-model="state"
        label="State"
      ></ValidInput>
      <ValidInput
        v-model="city"
        auto-complete
        :items="geo.cities.value"
        label="City"
      ></ValidInput>
      <div class="bg-black-700 p-2 rounded-lg">
        <ValidInput
          prefix="NGN"
          v-model="input3"
          password
          dark
          label="Valued Input"
        ></ValidInput>
      </div>
      <ValidInput
        prefix="NGN"
        v-model="input3"
        password
        label="Valued Input"
      ></ValidInput>
      <ValidInput v-model="input4" clearable label="Input"></ValidInput>
      <ValidInput
        v-model="input5"
        :items="items"
        auto-complete
        label="Auto Input"
      ></ValidInput>
      <ValidInput
        v-model="input7"
        :items="itemsObject"
        item-text="title"
        item-value="id"
        auto-complete
        label="Auto Input Object"
      ></ValidInput>
      <ValidInput
        v-model="input8"
        :items="itemsObject"
        item-text="title"
        auto-complete
        label="Auto Input Object 2"
      ></ValidInput>
      <ValidInput
        v-model="input6"
        :items="couriers"
        select
        label="Select Input"
      >
        <template #inner>Hello world</template>
      </ValidInput>
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
import { geo as _geo } from "@/hooks/country";
export default {
  props: {},
  setup(props, { emit }) {
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
    });
    const action = async () => {
      await useTime.delay(3000);
    };
    const geo = _geo();
    geo.initialize(inputs.country, inputs.state, inputs.city);
    onMounted(() => {
      loaderHook.initCouriers().then((d) => {});
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

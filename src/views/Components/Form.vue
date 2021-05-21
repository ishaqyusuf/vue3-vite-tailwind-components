<template>
  <Container class="grid grid-cols-4 gap-10 w-full">
    <Input v-model="input1" clearable label="Input"></Input>
    <Input v-model="input2" clearable label="Hello World"></Input>
    <Input
      :items="loader.couriers.value"
      auto-complete
      clearable
      label="Courier"
    ></Input>
    <div class="col-span-4">
      {{ inputs }}
    </div>
  </Container>
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
export default {
  props: {},
  setup(props, { emit }) {
    const inputs = reactive({
      input1: "",
      input2: "",
    });
    const action = async () => {
      await useTime.delay(3000);
    };
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
      items: ["Item 1", "Item 2", "Item 3"],
      loader: loaderHook,
    };
  },
};
</script>

<style scoped></style>

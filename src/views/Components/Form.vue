<template>
  <FormInput v-model="input1" clearable label="Hello World"></FormInput>
  <span>{{ input1 }}</span>
  <!-- <Input select tile :items="items" v-model="input1"></Input> -->
  <Btn :action="advance" async>Action Button</Btn>
  <Btn :action="action" async>Async Action Button</Btn>
</template>

<script lang="ts">
import { ref } from "vue";
import useTime from "@/hooks/time";
export default {
  props: {},
  setup(props, { emit }) {
    const input1 = ref("");
    const action = async () => {
      await useTime.delay(3000);
    };
    const advance = async () => {
      return new Promise(async (resolve, reject) => {
        useTime.delay(4000).then((r) => {
          resolve(true);
        });
      });
    };
    const finallys = () => {};
    return {
      input1,
      advance,
      finallys,
      action,
      items: ["Item 1", "Item 2", "Item 3"],
    };
  },
};
</script>

<style scoped></style>

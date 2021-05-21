<template>
  <div class=""
  <FormInput v-model="input1" clearable label="Hello World"></FormInput>
  <FormInput password type="password" label="Hello World"></FormInput>
  <FormInput :items="['a', 'b', 'c']" label="Hello World"></FormInput>
  <span>{{ input1 }}</span>
  <!-- <Input select tile :items="items" v-model="input1"></Input> -->
  <Btn :action="advance" async>Action Button</Btn>
  <Btn :action="action" async>Async Action Button</Btn>
</template>

<script lang="ts">
import { ref, onMounted } from "vue";
import useTime from "@/hooks/time";
import loaderHook from "@/hooks/dataLoader";
export default {
  props: {},
  setup(props, { emit }) {
    const input1 = ref("");
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
      input1,
      advance,
      finallys,
      action,
      items: ["Item 1", "Item 2", "Item 3"],
      ...loaderHook,
    };
  },
};
</script>

<style scoped></style>

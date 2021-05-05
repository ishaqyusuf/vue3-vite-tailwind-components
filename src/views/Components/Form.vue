<template>
  <Input select tile :items="items" v-model="input1"></Input>
  <Btn :action="action" async @result="finallys" :loading="loading"
    >Action Button</Btn
  >
</template>

<script lang="ts">
import { ref } from "vue";
import useTime from "@/hooks/time";
export default {
  props: {},
  setup(props, { emit }) {
    const input1 = ref();
    const loading = ref(false);
    const action = async () => {
      await useTime.delay(3000);
      console.log("done");
    };
    const finallys = () => {
      console.log("Hello");
    };
    return {
      input1,
      finallys,
      action,
      loading,
      items: ["Item 1", "Item 2", "Item 3"],
    };
  },
};
</script>

<style scoped></style>

<template>
  <Card class="w-36">
    <CardContent>
      <div class="w-full inline-flex justify-between">
        <Btn icon @click=""><i-mdi-chevron-left /></Btn>
        <Btn text class="w-full" @click="">2021</Btn>
        <Btn icon @click=""><i-mdi-chevron-right /></Btn>
      </div>
    </CardContent>
  </Card>
</template>

<script lang="ts">
import { ref } from "vue";

export default {
  props: {},
  setup(props, { emit }) {
    return {};
  },
};
</script>

<style scoped></style>

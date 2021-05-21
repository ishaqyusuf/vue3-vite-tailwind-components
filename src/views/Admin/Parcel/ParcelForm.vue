<template>
  <CardContent class="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center pb-4"
    ><Label class="sm:col-span-1">weight</Label>
    <Input dense class="sm:col-span-2" v-model="form.track_code"
  /></CardContent>
  <CardActions>
    <Btn secondary @click="close">Cancel</Btn>
    <Btn @click="save">Save</Btn>
  </CardActions>
</template>

<script lang="ts">
import { ref } from "vue";
import { Parcel } from "@/@types/Interface";
export default {
  props: {
    parcel: Object,
  },
  setup(props, { emit }) {
    return {
      form: ref<Parcel>({}),
      save: () => {
        emit("close");
      },
      close: () => emit("close"),
    };
  },
};
</script>

<style scoped></style>

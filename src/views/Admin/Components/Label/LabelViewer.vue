<template>
  <Prompt v-model="show" pilot>
    <template #container>
      <div class="max-w-md mx-auto bg-red-400">as</div>
    </template>
  </Prompt>
</template>

<script lang="ts">
import parcel from "@/use/parcels/parcel";
import { ref } from "vue";
import { useLabelComposer } from "@/use/use-label-composer";
export default {
  props: {},
  setup(props, { emit }) {
    const show = ref(false);
    const item = ref();

    const open = async (_item) => {
      item.value = _item;
      const label = await useLabelComposer(_item.track_code);
      if (label) {
        console.log(label);
      }
    };
    return {
      show,
      item,
      open,
    };
  },
};
</script>

<style scoped></style>

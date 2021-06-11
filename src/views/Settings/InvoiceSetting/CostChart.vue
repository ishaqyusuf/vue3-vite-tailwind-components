<template>
  <div class="grid w-full gap-2 grid-cols-12">
    <Input
      dense
      class="col-span-3"
      select
      v-model="form.type"
      :items="chatTypes"
    />
  </div>
</template>

<script lang="ts">
import { useModelWrapper } from "@/use/modelWrapper";
import { ref } from "vue";

export default {
  props: {
    modelValue: Object,
  },
  // {value,floor,celing,floorInclusive,ceilingInclusive,isEqual,isLess,isBetween}
  setup(props, { emit }) {
    const form = useModelWrapper(props, emit);

    const chatTypes = ref(["<==>", "=="]);
    return {
      chatTypes,
      form,
    };
  },
};
</script>

<style scoped></style>

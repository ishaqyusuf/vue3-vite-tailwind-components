<template>
  <div class="grid grid-cols-12">
    <Label class="col-span-5">{{ label }}</Label>
    <div class="col-span-7">
      <Input select v-if="!index" />
      <div v-else class="text-gray-600">
        <span class="text-base font-semibold text-gray-700">
          {{ address.name }}
        </span>
        <Truncify>{{ address.address_1 }}</Truncify>
        <Truncify>{{ address.line_1 }}</Truncify>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import useAddressBook from "@/use/list/use-address-book";
import { computed, ref } from "vue";

export default {
  props: {
    label: String,
    subtitle: String,

    index: { type: Number, required: true },
  },
  setup(props, { emit }) {
    const address = computed(
      () => useAddressBook.list.itemByIds.value[props.index]
    );
    return {
      address,
    };
  },
};
</script>

<style scoped></style>

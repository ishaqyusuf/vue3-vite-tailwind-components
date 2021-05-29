<template>
  <Menu no-width>
    <Input readonly v-model="modelValue">
      <template #prependInner>
        <i-mdi-calendar-outline />
      </template>
    </Input>
    <template v-slot:items>
      <DatePicker v-model="modelValue" />
    </template>
  </Menu>
</template>

<script lang="ts">
import { useModelWrapper } from "@/use/modelWrapper";
import { ref } from "vue";

export default {
  props: {
    modelValue: String,
  },
  setup(props, { emit }) {
    return {
      date: useModelWrapper(props, emit),
    };
  },
};
</script>

<style scoped></style>

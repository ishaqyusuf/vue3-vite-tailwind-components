<template>
  <Prompt v-model="show" no-action title="Edit Parcel">
    <template #info>
      <ParcelForm
        @close="onClose"
        :parcel="parcel"
        v-bind="$props"
      ></ParcelForm>
    </template>
  </Prompt>
</template>

<script lang="ts">
import { ref } from "vue";
import ParcelForm from "@/views/Admin/Parcel/ParcelForm.vue";
export default {
  components: {
    ParcelForm,
  },
  props: {
    lsHook: Object,
    prompt: { type: Boolean, default: true },
  },
  setup(props, { emit }) {
    const show = ref(false);
    const parcel = ref();
    const open = (_parcel) => {
      parcel.value = parcel;
      show.value = true;
    };

    return {
      parcel,
      show,
      onClose: (parcel) => {
        show.value = false;
      },
    };
  },
};
</script>

<style scoped></style>

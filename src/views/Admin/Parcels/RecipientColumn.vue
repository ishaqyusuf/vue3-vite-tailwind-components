<template>
  <router-link
    :to="{
      query: {
        popup_action: 'parcel_recipient',
        pid: item.track_code,
      },
    }"
  >
    <span
      v-if="!item.recipient"
      class="font-medium bg-gray-200 hover:shadow-md uppercase text-xs tracking-widest cursor-pointer p-1 group-hover:bg-blue-800 group-hover:text-white"
      >Add Client</span
    >
    <span v-else>
      <span class="font-medium">{{ item.recipient.full_name }}</span>
    </span>
  </router-link>
</template>

<script lang="ts">
import { ref } from "vue";

export default {
  props: {
    item: { type: Object, required: true },
  },
  setup(props, { emit }) {
    return {};
  },
};
</script>

<style scoped></style>

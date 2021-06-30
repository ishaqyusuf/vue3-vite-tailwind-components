<template>
  <div>
    <slot v-if="!client || !client.id" name="empty"></slot>
    <div
      v-else
      class="inline-flex items-center w-full"
      :class="{
        'space-x-4': !dense,
        'space-x-2': dense,
      }"
    >
      <Avatar v-if="!contacts" v-bind="$props"></Avatar>
      <div class="w-full">
        <template v-if="!contacts">
          <Label>{{ client.full_name }}</Label>
          <Truncify class="text-sm text-gray-500">{{ client.email }}</Truncify>
        </template>
        <template v-else>
          <div class="inline-flex justify-between w-full">
            <Truncify class="w-3/4"
              ><Label>{{ client.name }}</Label></Truncify
            >
          </div>
          <Truncify class="text-sm text-gray-500">
            <span class="pr-1" v-if="client.address_1"
              >{{ client.address_1 }},</span
            >
            <span>{{ client.state }}</span>
          </Truncify>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, toRef, watch } from "vue";
import { Recipient } from "@/@types/Interface";
export default {
  props: {
    client: { type: Object, required: true },
    contacts: Boolean,
    dense: Boolean,
    sm: Boolean,
  },
  setup(props, { emit }) {
    watch(props, (value, old) => {});
    return {};
  },
};
</script>

<style scoped></style>

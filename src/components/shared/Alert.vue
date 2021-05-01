<template>
  <div
    v-if="data"
    id="alert"
    class="sm:rounded-md p-2 px-4 inline-flex space-x-4 text-white"
    :class="{
      'bg-green-400 border-green-500': data.success,
      'bg-red-400 border-red-500': !data.success,
      'border-r-4': border == 'right',
      'border-l-4': border == 'left',
      'border-b-4': border == 'bottom',
      'border-t-4': border == 'top',
    }"
  >
    <i-mdi-check-circle-outline v-if="data.success" />
    <i-mdi-alert v-else />
    <span
      ><slot>{{ data.text }}</slot></span
    >
  </div>
</template>

<script lang="ts">
import { onMounted, ref } from "vue";
import timer from "@/hooks/time";
import alertHook from "@/hooks/alert";
export default {
  props: {
    value: Boolean,
    border: String,
    data: {
      default: () => {
        return { success: true, text: "" };
      },
    },
  },
  setup(props, { emit }) {
    onMounted(() => {
      const { delay } = props.data;
      if (delay)
        timer.delay(2000).then((d) => {
          alertHook.destroyAlert(props.data);
        });
    });
    return {};
  },
};
</script>

<style scoped></style>

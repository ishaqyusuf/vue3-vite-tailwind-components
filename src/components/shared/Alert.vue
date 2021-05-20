<template>
  <transition
    enter-active-class="transition transform duration-100 ease-out"
    enter-from-class="transform scale-95 opacity-0"
    enter-to-class="transform scale-100  opacity-100"
    leave-active-class="transition duration-75 ease-in"
    leave-from-class="transform scale-100 opacity-100"
    leave-to-class="transform scale-95 opacity-0"
  >
    <div
      v-if="data"
      id="alert"
      class="sm:rounded-md p-2 px-4 inline-flex items-center space-x-4 text-white"
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
      <Spacer></Spacer>
      <Btn icon class="text-red-100"> <i-mdi-close /></Btn>
    </div>
  </transition>
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
    function destroy() {
      alertHook.destroyAlert(props.data);
    }
    onMounted(() => {
      const { delay } = props.data;
      if (delay)
        timer.delay(props.data.delay ?? 2000).then((d) => {
          destroy();
        });
    });
    return {
      destroy,
    };
  },
};
</script>

<style scoped></style>

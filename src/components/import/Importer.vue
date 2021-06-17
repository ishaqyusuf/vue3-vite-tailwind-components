<template>
  <div>
    <slot name="btn" :open="init"></slot>

    <Prompt
      v-model="show"
      @closed="show = false"
      ok="Export"
      cancelable
      hide-cancel
      :ok-action="continueExport"
      title="Configure Export"
    >
      <template #info>
        <div class="p-4 max-h-96 overflow-auto">//</div>
      </template>
    </Prompt>
  </div>
</template>

<script lang="ts">
import { useExport } from "@/use/data/use-export";
import { ref } from "vue";

export default {
  props: {},
  setup(props, { emit }) {
    const show = ref(false);
    const continueExport = () => {};
    const _useExport = useExport();
    const init = (exportUse) => {
      show.value = true;
    };

    return { _useExport, init, continueExport, show };
  },
};
</script>

<style scoped></style>

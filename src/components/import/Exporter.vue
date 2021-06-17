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
        <div class="p-4 max-h-96 overflow-auto">
          <div class="space-y-3 flex flex-col">
            <div class="grid w-full grid-cols-12">
              <Label class="col-span-6">Columns</Label>
              <Label class="col-span-6">Export Title</Label>
            </div>
            <div
              class="grid w-full grid-cols-12 items-center"
              v-for="(struct, index) in exportConfig.structure"
              :key="index"
            >
              <Checkbox
                class="col-span-6"
                v-model="struct.export"
                :label="struct.title"
              />
              <Input v-model="struct.colTitle" dense class="col-span-6" />
            </div>
          </div>
        </div>
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
    const exportConfig = ref(useExport());
    const init = (_exportConfig) => {
      exportConfig.value = _exportConfig;
      exportConfig.value.structure.map((s) => {
        s.export = !s.hidden;
        s.colTitle = s.title;
        return s;
      });
      show.value = true;
    };

    return { exportConfig, init, continueExport, show };
  },
};
</script>

<style scoped></style>

<template>
  <div class="space-y-4">
    <Input grid v-model="form.title" label="Template Title" />
    <Input
      grid
      v-model="form.formula"
      :prefix="unit.currency"
      label="Unit Cost"
      :suffix="perw"
    ></Input>
  </div>
</template>

<script lang="ts">
import { useModelWrapper } from "@/use/modelWrapper";
import { ref, onMounted, computed } from "vue";
import useCurrency from "@/use/use-currency";
import CostChart from "./CostChart.vue";
import useMetaLoader from "@/use/api/use-meta-loader";
export default {
  components: { CostChart },
  props: {
    modelValue: Object,
  },
  setup(props, { emit }) {
    const form = useModelWrapper(props, emit);
    const chart = ref({});
    const unit = ref<any>({});
    const perw = computed(() => ["/", unit.value.weight].join(""));
    onMounted(async () => {
      unit.value = await useMetaLoader.units();
    });
    return {
      form,
      perw,
      unit,
      chart,
      currencies: useCurrency(),
    };
  },
};
</script>

<style scoped></style>

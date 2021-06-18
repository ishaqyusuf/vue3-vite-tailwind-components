<template>
  <Container class="space-y-4">
    <div class="inline-flex justify-between w-full items-center">
      <div class="inline-flex items-center space-x-2">
        <CardTitle>Dashboard</CardTitle>
      </div>
      <div class="inline-flex space-x-2">
        <Menu rtl>
          <Btn
            tertiary
            class="bg-blue-100 rounded-lg text-blue-700 font-semibold"
          >
            <span>Last 7 Days</span>
            <i-mdi-chevron-down />
          </Btn>
          <template v-slot:items>
            <SimpleMenuItem>All Time</SimpleMenuItem>
            <SimpleMenuItem>Today</SimpleMenuItem>
            <SimpleMenuItem>Last 7 days</SimpleMenuItem>
            <SimpleMenuItem>This Month</SimpleMenuItem>
            <SimpleMenuItem>Past 3 Months</SimpleMenuItem>
            <SimpleMenuItem>Past 6 Months</SimpleMenuItem>
            <SimpleMenuItem>This Year</SimpleMenuItem>
            <SimpleMenuItem>Date Range</SimpleMenuItem>
          </template>
        </Menu>
      </div>
    </div>
    <div class="grid grid-cols-12 gap-4">
      <SummaryCard v-for="(item, index) in stats" :item="item" :key="index">
        <template v-slot:icon>
          <!-- <i-carbon-graph/> -->
        </template>
      </SummaryCard>
      <Card class="col-span-8 h-60"></Card>
      <Card class="col-span-4"></Card>
      <Card class="col-span-6 h-60"></Card>
      <Card class="col-span-6"></Card>
    </div>
  </Container>
</template>

<script lang="ts">
import useApi from "@/use/api/use-api";
import { useBaseApi } from "@/use/api/use-base-api";
import { onMounted, ref } from "vue";
import SummaryCard from "@/views/Admin/Components/SummaryCard.vue";
export default {
  props: {},
  components: {
    SummaryCard,
  },
  setup(props, { emit }) {
    const stats = ref<any[]>([]);
    onMounted(() => {
      initialize();
    });
    async function initialize() {
      const data = await useBaseApi("dashboard").index({ mode: "m" });
      const colors = ["green", "yellow", "red", "indigo"];
      stats.value = data.stat.map((item, index) => {
        item.color = colors[index];
        return item;
      });
    }
    return {
      stats,
    };
  },
};
</script>

<style scoped></style>

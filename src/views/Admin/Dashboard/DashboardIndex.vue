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
      <Card class="col-span-8 h-72">
        <ApexChart
          type="line"
          height="100%"
          :options="options"
          :series="series"
        ></ApexChart>
      </Card>
      <Card class="col-span-4"></Card>
      <Card class="col-span-6 h-60"></Card>
      <Card class="col-span-6"></Card>
    </div>
  </Container>
</template>

<script lang="ts">
import { useBaseApi } from "@/use/api/use-base-api";
import { onMounted, ref } from "vue";
import SummaryCard from "@/views/Admin/Components/SummaryCard.vue";
import ApexChart from "@/components/Chart.vue";
export default {
  props: {},
  components: {
    SummaryCard,
    ApexChart,
  },
  setup(props, { emit }) {
    const stats = ref<any[]>([]);
    onMounted(() => {
      initialize();
    });
    async function initialize() {
      const { stat, pie, ...data } = await useBaseApi("dashboard").index({
        mode: "m",
      });
      const colors = ["green", "yellow", "red", "indigo"];
      stats.value = stat.map((item, index) => {
        item.color = colors[index];
        return item;
      });
      plotGraph(data);
    }
    function plotGraph(data) {
      const { dates, data: graphData } = data.parcel_graph;
      series.value = [{ name: "Parcels", data: graphData ?? [] }];
      options.value.xaxis.categories = dates ?? [];
    }
    const options = ref({
      stroke: {
        curve: "smooth",
      },
      chart: {
        toolbar: { show: false },
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#FF1654", "#247BA0"],
      xaxis: {
        categories: [],
        type: "datetime",
        labels: {
          // format: "MMM d",
          // formatter: function(value) {
          //   return value + "$";
          // },
          datetimeFormatter: {
            year: "yyyy",
            month: "MMM 'yy",
            day: "dd MMM",
            hour: "HH:mm",
          },
        },
      },
    });
    const series = ref<any[]>([]);
    return { options, stats, series };
  },
};
</script>

<style scoped></style>

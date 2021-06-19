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
      <Card class="col-span-8">
        <CardTitle lg class="opacity-70" dense>Parcels</CardTitle>
        <div class="h-64">
          <ApexChart
            type="line"
            height="100%"
            :options="lineChart.options"
            :series="lineChart.series"
          ></ApexChart>
        </div>
      </Card>
      <Card class="col-span-4">
        <ApexChart
          type="donut"
          height="100%"
          :options="pieChart.options"
          :series="pieChart.series"
        ></ApexChart>
      </Card>
      <Card class="col-span-6">
        <CardTitle lg class="opacity-70" dense>Recent Shippings</CardTitle>
        <RecentShipments class="max-h-60 overflow-auto"></RecentShipments>
      </Card>
      <Card class="col-span-6">
        <CardTitle lg class="opacity-70" dense>Recent Invoices</CardTitle>
        <RecentInvoices class="max-h-60 overflow-auto"></RecentInvoices>
      </Card>
    </div>
  </Container>
</template>

<script lang="ts">
import { useBaseApi } from "@/use/api/use-base-api";
import { onMounted, reactive, ref } from "vue";
import SummaryCard from "@/views/Admin/Components/SummaryCard.vue";
import ApexChart from "@/components/Chart.vue";
import RecentInvoices from "@/views/Admin/Dashboard/RecentInvoices.vue";
import RecentShipments from "@/views/Admin/Dashboard/RecentShipments.vue";
export default {
  props: {},
  components: {
    RecentInvoices,
    RecentShipments,
    SummaryCard,
    ApexChart,
  },
  setup(props, { emit }) {
    const stats = ref<any[]>([]);
    const dataCollection = ref<any>();
    onMounted(() => {
      initialize();
      fillData();
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
      plotLineChart(data);
      plotPieChart(pie);
    }
    function fillData() {
      dataCollection.value = {
        labels: [getRandomInt(), getRandomInt()],
        datasets: [
          {
            label: "Data One",
            backgroundColor: "#f87979",
            data: [getRandomInt(), getRandomInt()],
          },
          {
            label: "Data One",
            backgroundColor: "#f87979",
            data: [getRandomInt(), getRandomInt()],
          },
        ],
      };
    }
    function getRandomInt() {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
    }
    function plotPieChart(pie) {
      const { labels, data: series } = pie;
      pieChart.series = series;
      pieChart.options.labels = labels;
      pieChart.options = { ...pieChart.options };
    }
    function plotLineChart(data) {
      const { dates, data: graphData } = data.parcel_graph;

      lineChart.series = [{ name: "Parcels", data: graphData ?? [] }];
      lineChart.options.xaxis.categories = dates ?? [];
      lineChart.options = { ...lineChart.options };
      // lineChart.options = {
      //   ...lineChart.options,
      //   xaxis: {
      //     ...lineChart.options.xaxis,
      //     categories: dates ?? [],
      //   },
      // };
    }
    const options = {
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
    };
    const lineChart = reactive<{ options: any; series: any[] }>({
      options,
      series: [],
    });
    const pieOptions = {
      legend: { position: "bottom" },
      labels: [],
      plotOptions: {
        pie: {
          donut: {
            size: "0%",
          },
        },
      },
    };

    const pieChart = reactive<{ options: any; series: any[] }>({
      options: pieOptions,
      series: [],
    });
    return { stats, pieChart, lineChart, dataCollection };
  },
};
</script>

<style scoped></style>

<template></template>

<script lang="ts">
import { ref, onMounted, defineComponent } from "vue";
// import { Line, mixins } from "vue-chartjs";
import { Bar } from "vue3-chart-v2";
export default defineComponent({
  extends: Bar,
  mounted() {
    this.renderChart(
      {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ],
        datasets: [
          {
            label: "GitHub Commits",
            backgroundColor: "#f87979",
            data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11],
          },
        ],
      },
      {}
    );
  },
});
</script>

<style scoped></style>

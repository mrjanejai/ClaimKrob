<template>
  <div>
    <apexchart
      width="400"
      height="400"
      type="area"
      :options="chartOptions"
      :series="chartSeries"
    ></apexchart>
  </div>
</template>

<script lang="ts">
import VueApexCharts from 'vue3-apexcharts';

export default {
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    return {
      chartOptions: {
        chart: {
          width: 400,
          height: 400,
          type: 'area',
        },
        series: [
          {
            name: 'Series 1',
            data: [77, 58, 63, 32, 58, 64, 78],
          },
        ],
        xaxis: {
          categories: ['OPD', 'IPD', 'NCD', 'TMD', 'PSY', 'PHY', 'ISM'],
        },
      },
      chartSeries: [],
    };
  },
};
</script>

<template>
  <div>
    <apexchart
      :options="chartOptions"
      :series="chartSeries"
      type="area"
      height="350"
      width="100%"
    />
  </div>
</template>

<script lang="ts">
import VueApexCharts from 'vue3-apexcharts';

export default {
  components: {
    apexchart: VueApexCharts,
  },
  setup() {
    const chartOptions = {
      chart: {
        id: 'basic-area',
      },
      xaxis: {
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
        ],
      },
      tooltip: {
        theme: 'dark',
      },
    };

    const chartSeries = [
      {
        name: 'series-1',
        data: [30, 40, 45, 50, 49, 60, 70, 91, 125],
      },
    ];

    return {
      chartOptions,
      chartSeries,
    };
  },
};
</script>

<template>
  <div id="chart">
    <apexchart
      height="350"
      width="100%"
      type="radar"
      ref="chartRef"
      :options="chartOptions"
      :series="chartSeries"
    ></apexchart>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import ChartComponent from 'vue3-apexcharts';

export default defineComponent({
  components: {
    apexchart: ChartComponent,
  },
  setup() {
    const chartRef = ref<any>(null);

    const chartOptions = {
      chart: {
        id: 'chart',
        type: 'radar',
        foreColor: 'white',
        toolbar: {
          show: true,
        },
        dropShadow: {
          enabled: true,
          blur: 1,
          left: 1,
          top: 1,
        },
      },
      stroke: {
        width: 2,
      },
      fill: {
        opacity: 0.1,
      },
      markers: {
        size: 0,
      },
      xaxis: {
        categories: ['January', 'February', 'March', 'April', 'May', 'June'],
      },
    };

    const chartSeries = [
      {
        name: 'ความทันเวลา',
        data: [90, 15, 77, 30, 99, 45],
      },
      {
        name: 'ความสมบูรณ์',
        data: [70, 25, 37, 90, 19, 55],
      },
    ];

    return {
      chartRef,
      chartOptions,
      chartSeries,
    };
  },
});
</script>

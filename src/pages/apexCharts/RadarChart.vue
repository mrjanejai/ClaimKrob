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
        toolbar: {
          show: true,
        },
      },
      xaxis: {
        categories: ['January', 'February', 'March', 'April', 'May', 'June'],
      },
    };

    const chartSeries = [
      {
        name: 'series-1',
        data: [90, 15, 77, 30, 99, 45],
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

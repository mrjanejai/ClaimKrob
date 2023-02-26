<template>
  <div>
    <VueApexCharts
      :options="chartOptions"
      :series="chartSeries"
      type="bar"
      height="400"
      width="400"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import VueApexCharts from 'vue3-apexcharts';

export default defineComponent({
  components: {
    VueApexCharts,
  },
  setup() {
    const chartOptions = ref({
      chart: {
        id: 'basic-bar',
      },
      xaxis: {
        categories: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
        ],
      },
    });

    const chartSeries = ref([
      {
        name: 'series-1',
        data: [30, 40, 45, 50, 49, 60, 70],
      },
    ]);

    return {
      chartOptions,
      chartSeries,
    };
  },
});
</script>

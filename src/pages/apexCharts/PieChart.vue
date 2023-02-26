<template>
  <div id="chart">
    <apexchart :options="chartOptions" :series="series"></apexchart>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import VueApexCharts from 'vue3-apexcharts';

export default defineComponent({
  name: 'PieChart',
  components: {
    apexchart: VueApexCharts,
  },
  setup() {
    const series = ref([{ data: [44, 55, 41, 17, 15] }]);

    const chartOptions = ref({
      chart: {
        type: 'pie',
      },
      labels: ['Apple', 'Mango', 'Banana', 'Orange', 'Grapes'],
      title: {
        text: 'Fruits',
      },
      colors: ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0'],
    });

    onMounted(() => {
      setTimeout(() => {
        chartOptions.value.title.text = 'Updated Title';
        series.value = [{ data: [30, 40, 45, 50, 49] }];
      }, 2000);
    });

    return {
      series,
      chartOptions,
    };
  },
});
</script>

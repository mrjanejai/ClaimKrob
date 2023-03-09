<template>
  <div>
    <ApexCharts
      ref="chart"
      :options="chartOptions"
      :series="series"
    ></ApexCharts>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import ApexCharts from 'vue3-apexcharts';

export default defineComponent({
  name: 'BubbleChart',
  components: {
    ApexCharts,
  },
  setup() {
    const chart = ref(null);

    const series = ref([
      {
        name: 'Bubble1',
        data: generateData(new Date('11 Feb 2017').getTime(), 20, {
          min: 10,
          max: 60,
        }),
      },
      {
        name: 'Bubble2',
        data: generateData(new Date('11 Feb 2017').getTime(), 20, {
          min: 10,
          max: 60,
        }),
      },
      {
        name: 'Bubble3',
        data: generateData(new Date('11 Feb 2017').getTime(), 20, {
          min: 10,
          max: 60,
        }),
      },
    ]);

    const chartOptions = ref({
      chart: {
        height: 350,
        type: 'bubble',
      },
      dataLabels: {
        enabled: false,
      },
      fill: {
        opacity: 0.8,
      },
      title: {
        text: 'Simple Bubble Chart',
      },
      xaxis: {
        tickAmount: 12,
        type: 'datetime',
        labels: {
          rotate: 0,
        },
      },
      yaxis: {
        max: 70,
      },
    });

    function generateData(baseval: number, count: number, yrange: any) {
      let i = 0;
      const seriesData = [];
      while (i < count) {
        const x =
          Math.floor(Math.random() * (750000000 - 1350000000000 + 1)) +
          1350000000000;
        const y =
          Math.floor(Math.random() * (yrange.max - yrange.min + 1)) +
          yrange.min;
        const z = Math.floor(Math.random() * (75 - 15 + 1)) + 15;

        seriesData.push([x, y, z]);
        baseval += 86400000;
        i++;
      }
      return seriesData;
    }

    return { chart, series, chartOptions };
  },
  mounted() {
    // You can access the ApexCharts instance using this.$refs.chart.chart
    // For example:
    // this.chart.chart.updateOptions({ title: { text: 'New Chart Title' } })
  },
});
</script>

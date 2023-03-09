<template>
  <div>
    <apexchart
      width="400"
      height="400"
      type="bubble"
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
          type: 'bubble',
        },
        series: [
          {
            name: 'Series 1',
            data: [
              {
                x: 'OPD',
                y: 77,
                z: 30,
              },
              {
                x: 'IPD',
                y: 58,
                z: 20,
              },
              {
                x: 'NCD',
                y: 63,
                z: 15,
              },
              {
                x: 'TMD',
                y: 32,
                z: 25,
              },
              {
                x: 'PSY',
                y: 58,
                z: 35,
              },
              {
                x: 'PHY',
                y: 64,
                z: 10,
              },
              {
                x: 'ISM',
                y: 78,
                z: 40,
              },
            ],
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

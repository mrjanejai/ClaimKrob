<template>
  <div>
    <apexchart
      width="100%"
      height="350"
      type="pie"
      :options="chartOptions"
      :series="chartSeries"
    ></apexchart>
  </div>
</template>

<script>
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
          height: 350,
          type: 'pie',
        },
        series: [],
        labels: ['ได้เงินแล้ว', 'ยังไม่ได้เงิน'],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 300,
              },
              legend: {
                position: 'bottom',
              },
            },
          },
        ],
      },
      chartSeries: [63, 37],
    };
  },
};
</script>

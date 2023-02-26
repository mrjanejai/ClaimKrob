<template>
  <div id="container"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import * as Highcharts from 'highcharts';

export default defineComponent({
  mounted() {
    const json = {
      chart: {
        type: 'pie',
        data: [
          { x: 'Apples', value: '128.14', fill: 'green' },
          { x: 'Oranges', value: '128.14', fill: 'orange' },
        ],
        container: 'container',
      },
    };

    Highcharts.chart(json.chart.container, {
      chart: {
        type: json.chart.type,
      },
      title: {
        text: '',
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
          },
          colors: json.chart.data.map((item) => item.fill),
        },
      },
      series: [
        {
          name: 'Percentage',
          data: json.chart.data.map((item) => ({
            name: item.x,
            y: parseFloat(item.value),
          })),
        },
      ],
    });
  },
});
</script>

<style scoped>
#container {
  height: 400px;
}
</style>

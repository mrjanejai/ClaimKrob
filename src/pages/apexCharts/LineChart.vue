<template>
  <div>
    <apexchart
      ref="chart"
      :options="options"
      :series="series"
      type="rangeBar"
      height="350"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import ChartComponent from 'vue3-apexcharts';

export default defineComponent({
  components: {
    apexchart: ChartComponent,
  },
  setup() {
    const chartRef = ref<any>(null);

    const options = {
      chart: {
        height: 350,
        type: 'rangeBar',
      },
      series: [
        {
          name: 'Bob',
          data: [
            {
              x: 'Design',
              y: [
                new Date('2019-03-02').getTime(),
                new Date('2019-03-05').getTime(),
              ],
              fillColor: '#008FFB',
            },
            {
              x: 'Code',
              y: [
                new Date('2019-03-05').getTime(),
                new Date('2019-03-07').getTime(),
              ],
              fillColor: '#00E396',
            },
            {
              x: 'Test',
              y: [
                new Date('2019-03-03').getTime(),
                new Date('2019-03-09').getTime(),
              ],
              fillColor: '#FEB019',
            },
            {
              x: 'Deployment',
              y: [
                new Date('2019-03-20').getTime(),
                new Date('2019-03-22').getTime(),
              ],
              fillColor: '#FF4560',
            },
          ],
        },
      ],
      plotOptions: {
        bar: {
          horizontal: true,
          distributed: true,
          dataLabels: {
            hideOverflowingLabels: false,
          },
        },
      },
      xaxis: {
        type: 'datetime',
        tooltip: {
          enabled: false,
        },
      },
      yaxis: {
        show: false,
      },
      tooltip: {
        x: {
          show: false,
        },
      },
    };

    const series = options.series;

    onMounted(() => {
      if (chartRef.value) {
        chartRef.value.updateOptions(options, false, true);
      }
    });

    return {
      chartRef,
      options,
      series,
    };
  },
});
</script>

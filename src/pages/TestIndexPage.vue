<template>
  <section class="layout">
    <div class="d1">กองทุน 1<br /><AreaChart /></div>
    <div class="d2">กองทุน 2<br /><BarChart /></div>
    <div class="d3">กองทุน 3<br /><BubbleChart /></div>
    <div class="d4">กองทุน 4<br /><LineChart /></div>
    <div class="d5">กองทุน 5<br /><PieChart /></div>
    <div class="d6">กองทุน 6<br /><RadarChart /></div>
  </section>
</template>

<script setup lang="ts">
import AreaChart from '@/pages/apexCharts/AreaChart.vue';
import BarChart from '@/pages/apexCharts/BarChart.vue';
import BubbleChart from '@/pages/apexCharts/BubbleChart.vue';
import LineChart from '@/pages/apexCharts/LineChart.vue';
import PieChart from '@/pages/apexCharts/PieChart.vue';
import RadarChart from '@/pages/apexCharts/RadarChart.vue';
import { useMeta } from 'quasar';
useMeta({
  title: 'Claim Krob Page',
  meta: {
    description: { name: 'description', content: 'Claim Krob Page' },
    keywords: { name: 'keywords', content: 'Quasar website' },
    equiv: {
      'http-equiv': 'Content-Type',
      content: 'text/html; charset=UTF-8',
    },
    // note: for Open Graph type metadata you will need to use SSR, to ensure page is rendered by the server
    ogTitle: {
      property: 'og:title',
      // optional; similar to titleTemplate, but allows templating with other meta properties
      template() {
        return 'Claim Krob Page';
      },
    },
  },
});
</script>
<style scoped>
.layout {
  width: 100%;
  height: 100%;

  display: grid;
  grid:
    'd1 d2 d3' 1fr
    'd4 d5 d6' 1fr
    / 1fr 1fr 1fr;
  gap: 3px;
}

.d1 {
  grid-area: d1;
}
.d2 {
  grid-area: d2;
}
.d3 {
  grid-area: d3;
}
.d4 {
  grid-area: d4;
}
.d5 {
  grid-area: d5;
}
.d6 {
  grid-area: d6;
}
</style>

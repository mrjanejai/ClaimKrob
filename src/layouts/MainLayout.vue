<template>
  <q-layout view="hHh LpR fFf">
    <app-header />
    <app-drawer />

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script lang="ts">
import { useAuthenStore } from 'stores/authenStore';
import useInitAuth from 'src/composables/useInitAuth';
import { useMeta } from 'quasar';
useMeta({
  title: '---Claim Krob---',
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
        return '---Claim Krob---';
      },
    },
  },
});
export default {
  async preFetch({ ssrContext, redirect }) {
    const authenStore = useAuthenStore();
    if (!authenStore.auth) {
      const { init } = useInitAuth(ssrContext, redirect);
      const userData = await init();
      if (userData) {
        authenStore.setAuthen(userData);
      }
    }
  },
};
</script>

<script lang="ts" setup>
import AppDrawer from 'src/components/base/AppDrawer.vue';
import AppHeader from 'src/components/base/AppHeader.vue';
</script>

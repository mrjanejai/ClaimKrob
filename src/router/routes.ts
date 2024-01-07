import { RouteRecordRaw } from 'vue-router';
// import checkAuth from '@/utils/checkAuth';
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    meta: { requireAuth: true },
    // beforeEnter: checkAuth,
    children: [
      { path: '', component: () => import('pages/TestIndexPage.vue') },
      { path: 'main', component: () => import('@/pages/TestIndexPage.vue') },
      {
        path: 'ipd',
        component: () => import('@/pages/ipd/SyncIPD.vue'),
      },
      {
        path: 'opd',
        component: () => import('@/pages/opd/SyncOPD.vue'),
      },
      {
        path: 'echeck',
        component: () => import('@/pages/funds/ECheck.vue'),
      },
      {
        path: 'erep',
        component: () => import('@/pages/funds/UploadApi.vue'),
        //component: () => import('@/pages/funds/ERepUpload.vue'),
      },
      {
        path: 'estm',
        component: () => import('@/pages/funds/EStmUpload.vue'),
      },
      {
        path: 'emoney',
        component: () => import('@/pages/funds/EMoneyUpload.vue'),
      },
      {
        path: 'scheck',
        component: () => import('@/pages/funds/SCheck.vue'),
      },
      {
        path: 'srep',
        component: () => import('@/pages/funds/SRepUpload.vue'),
      },
      {
        path: 'sstm',
        component: () => import('@/pages/funds/SStmUpload.vue'),
      },
      {
        path: 'smoney',
        component: () => import('@/pages/IndexPage.vue'),
      },
      {
        path: 'stmain',
        component: () => import('@/pages/settings/SyncMaster.vue'),
      },
      {
        path: 'stfund',
        component: () => import('@/pages/settings/SetFunds.vue'),
      },
      { path: 'pinia', component: () => import('@/pages/PiniaPage.vue') },
      { path: 'i18n', component: () => import('@/pages/I18nPage.vue') },
      { path: 'theme', component: () => import('@/pages/ThemePage.vue') },
      { path: 'fetch-data', component: () => import('@/pages/FetchData.vue') },
      { path: 'tutor1', component: () => import('@/pages/TutorPage1.vue') },
      { path: 'test', component: () => import('@/pages/FetchData.vue') },
    ],
  },
  {
    path: '/feed',
    component: () => import('@/layouts/FeedLayout.vue'),
    meta: { requireAuth: true },
    // beforeEnter: checkAuth,
    children: [{ path: '', component: () => import('pages/FeedPage.vue') }],
  },
  {
    path: '/settings',
    // beforeEnter: checkAuth,
    component: () => import('layouts/UserSettingLayout.vue'),
    children: [
      { path: '', redirect: '/settings/profile' },
      {
        path: 'profile',
        component: () => import('@/pages/settings/ProfilePage.vue'),
      },
      {
        path: 'notifications',
        component: () => import('@/pages/settings/NotificationPage.vue'),
      },
      {
        path: 'security',
        component: () => import('@/pages/settings/SecurityPage.vue'),
      },
      {
        path: 'emails',
        component: () => import('@/pages/settings/EmailPage.vue'),
      },
    ],
  },
  {
    path: '/auth',
    component: () => import('layouts/BlankLayout.vue'),
    children: [
      { path: '', redirect: '/auth/login' },
      { path: 'login', component: () => import('@/pages/auth/LoginPage.vue') },
      {
        path: 'login2',
        component: () => import('@/pages/auth/Login2Page.vue'),
      },
    ],
  },
  {
    path: '/error',
    name: 'ErrorPage',
    component: () => import('pages/ErrorPage.vue'),
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
  { path: '/error500', component: () => import('pages/Error500.vue') },
  { path: '/test', component: () => import('pages/TestPage.vue') },
];

export default routes;

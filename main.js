import { createApp } from 'vue';
import { createRouter, createWebHashHistory  } from 'vue-router';

import App from './src/App.vue';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [{ path: '/', component: () => import('./src/pages/MainPage.vue') }],
});

const app = createApp(App);

app.use(router);
app.mount('#app');

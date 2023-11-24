import { createRouter, createWebHistory } from 'vue-router';

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: () => import('../views/Home.vue'), name: 'home' },
    { path: '/play', component: () => import('../views/Play.vue'), name: 'play' },
  ],
});

import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import MangaList from '../views/manga/MangaList.vue';
import MangaCreate from '../views/manga/MangaCreate.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/manga/list',
    name: 'MangaList',
    component: MangaList
  },
  {
    path: '/manga/add',
    name: 'MangaCreate',
    component: MangaCreate
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;

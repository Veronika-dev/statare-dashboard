import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import DashboardPage from '@/views/dashboard-page.vue';
import TasksPage from '@/views/tasks-page.vue';
import TeamsPage from '@/views/teams-page.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    component: DashboardPage,
  },
  {
    path: '/tasks',
    name: 'tasks',
    component: TasksPage,
  },
  {
    path: '/teams',
    name: 'teams',
    component: TeamsPage,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;

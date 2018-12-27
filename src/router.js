import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
// webpack 懒加载
function loadView(view) {
  return () => import(/* webpackChunkName: "view-[request]" */ `@/views/${view}.vue`);
}

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/index',
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/TheLogin.vue'),
    },
    {
      path: '/index',
      component: () => import('@/views/index.vue'),
      children: [
        {
          path: 'resume',
          name: 'resume',
          component: () => import('@/views/resume/index.vue'),
        },
        {
          path: 'job',
          name: 'job',
          component: () => import('@/views/job/index.vue'),
        },
        {
          path: 'school',
          name: 'school',
          component: () => import('@/views/school/index.vue'),
        },
      ],
    },
  ],
});

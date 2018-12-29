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
      component: loadView('login/TheLogin'),
    },
    {
      path: '/index',
      component: loadView('index'),
      children: [
        {
          path: 'resume',
          name: 'resume',
          component: loadView('resume/index'),
        },
        {
          path: 'job',
          name: 'job',
          component: loadView('job/index'),
        },
        {
          path: 'school',
          name: 'school',
          component: loadView('school/index'),
        },
        {
          path: 'news',
          name: 'news',
          component: loadView('news/index'),
        },
      ],
    },
  ],
});

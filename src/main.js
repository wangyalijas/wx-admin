import Vue from 'vue';
import ElementUI from 'element-ui';
import App from './App.vue';
import router from './router';
import store from './store/index';
import 'element-ui/lib/theme-chalk/index.css';
import RouterMixin from './mixins/router';

Vue.use(ElementUI);
Vue.mixin(RouterMixin);
Vue.config.productionTip = false;

// 全局路由守卫
router.beforeEach((to, from, next) => {
  const isLogin = store.state.header && store.state.userAccount;
  if (isLogin) {
    next();
  } else if (!isLogin) {
    if (to.path !== '/login') {
      next({ path: '/login' });
    } else {
      next();
    }
  }
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');

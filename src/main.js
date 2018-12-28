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

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');

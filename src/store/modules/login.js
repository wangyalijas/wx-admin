import setting from '@/services/config';
import api from '@/services/index';

const login = {
  namespaced: true,
  state: {
  },
  getters: {},
  // 同步操作
  mutations: {
  },
  // 异步操作
  actions: {
    postLogin(state, params) {
      return new Promise((resolve, reject) => {
        api(setting.urlConfig.postLogin, params).then((data) => {
          console.log('%c%s', 'color:blue', '=======> 登录');
          resolve(data);
        }).catch((err) => {
          reject(err);
        });
      });
    },
  },
};
export default login;

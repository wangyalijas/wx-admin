import setting from '@/services/config';
import api from '@/services/index';
/* eslint-disable */
const state = {
};

const getters = {
};

const mutations = {
};

const actions = {
  postJob(state, params) {
    return new Promise((resolve, reject) => {
      api(setting.urlConfig.job.postJob, params).then((data) => {
        console.log('%c%s', 'color:blue', '=======> 提交职位');
        resolve(data);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  getJobList({ commit }, payload) {
    return new Promise(((resolve, reject) => {
      api(setting.urlConfig.job.getJobList, payload).then(res => {
        console.log('%c%s', 'color:blue', '=======> 职位列表');
        resolve(res)
      }).catch(res => {
        reject(res)
      });
    }))
  },
};


export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

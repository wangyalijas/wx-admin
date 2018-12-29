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
  getJobListForAdmin({ commit }, payload) {
    return new Promise(((resolve, reject) => {
      api(setting.urlConfig.job.getJobListForAdmin, payload).then(res => {
        console.log('%c%s', 'color:blue', '=======> 职位列表');
        resolve(res)
      }).catch(res => {
        reject(res)
      });
    }))
  },
  putJobState({ commit }, payload) {
    return new Promise(((resolve, reject) => {
      const urlConfig = {
        url: `api/putJobState/${payload.id}`,
        mockUrl: '',
        method: 'PUT',
      }
      delete payload.id;
      api(urlConfig, payload).then(res => {
        console.log('%c%s', 'color:blue', '=======> 上下线职位');
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

/**
 * Created by sven on 2017/6/18.
 */
import { Message } from 'element-ui';
import Store from '@/store/index';
import setting from '@/services/config';

const mockMode = false; // 是否使用mock数据
const axios = require('axios');

const baseURL = mockMode ? '../css/mock/' : setting.baseUrl;

axios.interceptors.request.use((config) => {
  // 这里可以加一些交互动作，比如来个进度条开始效果
  return config;
}, (error) => {
  return Promise.reject(error);
});

axios.interceptors.response.use((res) => {
  if (res.status >= 200 && res.status <= 300) {
    return res;
  }
  // 由后端抛出的错误
  return Promise.reject(res);
}, (error) => {
  // 由网络服务器抛出的错误
  return Promise.reject(error);
});

const catchErrorEvt = function (error) {
  switch (error.status) {
    case 404:
      console.log('接口不存在');
      break;
    case '500':
      console.log('接口报错');
      break;
    default:
      console.log('其他类型错误');
  }
  Message({
    message: '网络错误',
    type: 'error',
  });
};
function successState(params) {
  if (params.res.data.state === false) {
    Message({
      message: params.res.data.tip,
      type: 'error',
    });
  }
}
export default (options, data = {}, headers) => {
  const httpOptions = {
    url: baseURL + options.url,
    method: options.method,
    // get 请求时带的参数
    params: Object.assign(data),
    // post 请求的数据
    data: Object.assign(data),
    headers: Object.assign({ 'Content-Type': 'application/json' }, headers || Store.state.header),
  };
  if (mockMode) {
    httpOptions.url = baseURL + options.mockUrl;
  } else {
    httpOptions.url = baseURL + options.url;
  }
  // 请求协议对应的方法
  if (options.method === 'GET') {
    delete httpOptions.data;
  } else {
    delete httpOptions.params;
  }
  return new Promise((resolve, reject) => {
    axios(httpOptions)
      .then((res) => {
        resolve(res.data);
        successState({
          res,
          url: options.url,
        });
      }).catch((error) => {
        catchErrorEvt(error);
        reject(error);
      });
  });
};

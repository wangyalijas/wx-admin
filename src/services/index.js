/**
 * Created by sven on 2017/6/18.
 */
import { Message } from 'element-ui';
import Store from '@/store/index';
import setting from '@/services/config';

const mockMode = false; // 是否使用mock数据
const axios = require('axios');

const baseURL = mockMode ? '' : setting.baseUrl;

const catchErrorEvt = function catchErrorEvt(error) {
  let msg = '';
  switch (error) {
    case 422:
      msg = '非法参数';
      break;
    case 500:
      msg = '服务器内部错误';
      break;
    case 401:
      msg = '非法访问';
      break;
    default:
      msg = '其他类型错误';
  }
  Message({
    message: msg,
    type: 'error',
  });
};

axios.interceptors.response.use((res) => {
  if (res.status >= 200 && res.status <= 300) {
    return res;
  }
  // 由后端抛出的错误
  return Promise.reject(res);
}, (error) => {
  // 拦截
  catchErrorEvt(JSON.parse(JSON.stringify(error)).response.status);
  Promise.reject(error);
});

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
        reject(error);
      });
  });
};

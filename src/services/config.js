export default {
  baseUrl: 'http://hufe.club:7002/',
  urlConfig: {
    common: {
      getEnum: {
        url: 'api/getEnum',
        mockUrl: '',
        method: 'GET',
      },
      getConstant: {
        url: 'api/getConstant',
        mockUrl: '',
        method: 'GET',
      },
    },
    login: {
      postLogin: {
        url: 'login/admin',
        mockUrl: '',
        method: 'POST',
      },
    },
    school: {
      getScheduleList: {
        // 校园行程列表
        url: 'api/getScheduleList',
        mockUrl: '',
        method: 'GET',
      },
      getSchedule: {
        url: 'api/getSchedule',
        mockUrl: '',
        method: 'GET',
      },
    },
    job: {
      postJob: {
        url: 'api/postJob',
        mockUrl: '',
        method: 'POST',
      },
      getJobListForAdmin: {
        url: 'api/getJobListForAdmin',
        mockUrl: '',
        method: 'GET',
      },
    },
    news: {
      getNewsList: {
        url: 'api/getNewsList',
        mockUrl: '',
        method: 'GET',
      },
      getNews: {
        url: 'api/getNews',
        mockUrl: '',
        method: 'GET',
      },
    },
  },
};

/* eslint-disable */
export default {
  settingEnum(state, data) {
    state.enum = data;
  },
  settingConstant(state, data) {
    state.constant = data;
  },
  getOpenIdUserId(state, data) {
    state.header = data;
  },
  getUserAccount(state, data) {
    state.userAccount = data;
  },
};

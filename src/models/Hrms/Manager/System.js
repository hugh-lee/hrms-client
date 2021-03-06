import * as sysUserService from '@/pages/Hrms/services/System/SysUserService';

export default {
  namespace: 'system',

  state: {
    context: {},
    currentUser: {},
  },

  effects: {
    *login({ payload }, { call, put }) {
      let response = yield call(sysUserService.getCode, payload);
      yield put({
        type: 'handleResponse',
        payload: response,
      });

      payload.publickey = '';
      response = yield call(sysUserService.login, payload);
      yield put({
        type: 'handleResponse',
        payload: response,
      });
    },

    *logout({ payload }, { call, put }) {
      const response = yield call(logout, payload);
      yield put({
        type: 'system_sysUser_logout',
        payload: response,
      });
    },
  },

  reducers: {
    handleResponse(state, { payload }) {
      return state;
    },
  },
};

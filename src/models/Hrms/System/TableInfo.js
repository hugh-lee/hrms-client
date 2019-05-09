import * as SysUserService from '@/pages/Hrms/services/System/SysUserService';

export default {
  namespace: 'tableInfo',

  state: {
    context: {},
    currentUser: {},
  },

  effects: {
    *login({ payload }, { call, put }) {
      let response = yield call(SysUserService.getCode, payload);
      yield put({
        type: 'handleResponse',
        payload: response,
      });

      payload.publickey = '';
      response = yield call(SysUserService.login, payload);
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

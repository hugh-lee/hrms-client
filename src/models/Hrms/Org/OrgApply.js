import * as sysUserService from '@/pages/Hrms/services/System/SysUserService';

export default {
  namespace: 'orgApply',

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
      if (payload.header.action == sysUserService.ACTION_GET_CODE) {
        state.context.RSAPublicKey = e.Body['code'] + '';
      }

      if (payload.header.action == sysUserService.ACTION_USER_LOGIN) {
      }

      return state;
    },
  },
};

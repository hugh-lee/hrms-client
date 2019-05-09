import * as SysCodeService from '@/pages/Hrms/services/System/SysCodeService';

export default {
  namespace: 'sysCode',

  state: {
    codes: [],
    types: [],
  },

  effects: {
    *getAllCode(_, { call, put }) {
      let response = yield call(SysCodeService.getAllCodes);
      yield put({
        type: SysUserService.getActionName(response),
        payload: response,
      });
    },
  },

  reducers: {
    ACTION_GET_ALL_CODE_VALUES(state, { payload }) {
      return { ...state, codes: payload.body.entrys };
    },
  },
};

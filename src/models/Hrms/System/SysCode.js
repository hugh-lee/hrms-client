import * as SysCodeService from '@/pages/Hrms/services/System/SysCodeService';

export default {
  namespace: 'sysCode',

  state: {
    codes: [],
    types: [],
  },

  effects: {
    *initialize(_, { call, put }) {
      let response = yield call(SysCodeService.getAllCodes);
      yield put({
        type: 'handleResponse',
        payload: response,
      });
    },
  },

  reducers: {
    handleResponse(state, { payload }) {
      if (payload.header.action == SysCodeService.ACTION_GET_ALL_CODE_VALUES) {
        state.codes = payload.body.entrys;
      }

      return state;
    },
  },
};

import * as StaffService from '@/pages/Hrms/services/Staff/StaffService';

export default {
  namespace: 'staffApply',

  state: {
    entrys: [],
    pagination: {},
  },

  effects: {
    *getStaffs({ payload }, { call, put }) {
      let { currentPage, pageSize } = this.payload;
      if (!currentPage) this.payload.currentPage = 1;

      if (!pageSize) this.payload.pageSize = 20;

      let response = yield call(StaffService.getStaffs, payload);
      yield put({
        type: StaffService.getActionName(response),
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
    ACTION_GET_STAFFS(state, { payload }) {
      const entrys = payload.body.entrys;
      const pagination = {
        total: payload.body.entryCount,
        pageSize: payload.body.pageSize,
        current: payload.body.pageNo,
      };

      return { ...state, entrys, pagination };
    },
  },
};

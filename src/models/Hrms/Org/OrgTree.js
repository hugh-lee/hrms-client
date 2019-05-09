import * as OrgService from '@/pages/Hrms/services/Org/OrgService';

export default {
  namespace: 'orgTree',

  state: {
    orgTrees: [],
    orgEntrys: [],
    orgEntrysVersion: undefined,
    depEntrys: [],
    depEntrysVersion: undefined,
  },

  effects: {
    *getOrgTrees({ payload, callback }, { call, put, select }) {
      if (!payload.force) {
        let orgTrees = yield select(state => state.orgTree.orgTrees);
        if (orgTrees && orgTrees.length > 0) {
          console.log('orgTrees exist');
          return;
        }
      }

      let response = yield call(OrgService.getOrgTrees, payload);
      yield put({
        type: OrgService.getActionName(response),
        payload: response,
      });

      if (callback) callback();
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
    ACTION_GET_ORG_TREES(state, { payload }) {
      let orgTrees, orgEntrys, orgEntrysVersion, depEntrys, depEntrysVersion;
      const body = payload.body;
      if (!body.force) {
        if (body.includeDep) {
          if (body['orgTrees']) {
            depEntrys = body['orgTrees'];
            depEntrysVersion = body['version'] + '';
          }
          orgTrees = depEntrys;
        } else {
          if (body['orgTrees']) {
            orgEntrys = body['orgTrees'];
            orgEntrysVersion = body['version'] + '';
          }
          orgTrees = orgEntrys;
        }
      } else {
        orgTrees = body['orgTrees'];
      }

      return {
        ...state,
        orgTrees,
        orgEntrys,
        orgEntrysVersion,
        depEntrys,
        depEntrysVersion,
      };
    },
  },
};

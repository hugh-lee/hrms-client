import { routerRedux } from 'dva/router';
import { message, Modal } from 'antd';
import {stringify} from "qs";
import { fakeSubmitForm, fakeAccountLogin, getFakeCaptcha  } from '@/services/api';

import { setAuthority } from '@/utils/authority';
import { reloadAuthorized } from '@/utils/Authorized';
import { getPageQuery } from '@/utils/utils';


import router from "umi/router";

const exptStrgthOptions = [
  {label: '未知', value: 8},
  {label: '小于100万', value: 7},
  {label: '100万以下', value: 7},
  {label: '100-500万', value: 6},
  {label: '100万-500万', value: 6},
  {label: '500-1000万', value: 5},
  {label: '500万-1000万', value: 5},
  {label: '1000-2000万', value: 4},
  {label: '1000万-2000万', value: 4},
  {label: '2000-5000万', value: 3},
  {label: '2000万-5000万', value: 3},
  {label: '5000万-1亿', value: 2},
  {label: '1亿以上', value: 1}];

const grwthStatusOptions = [
  {label: '未知', value: -1},
  {label: '增长', value: 0},
  {label: '平稳', value: 1},
  {label: '衰退', value: 2},
];

const devYearOptions = [
  {label: '未知', value: -1},
  {label: '小于1年', value: 0},
  {label: '1年', value: 1},
  {label: '2年', value: 2},
  {label: '3年及以上', value: 3},
];

const milgramOptions = [
  {label: '未知', value: -1},
  {label: '低', value: 0},
  {label: '中', value: 1},
  {label: '高', value: 2},
];

export default {
  namespace: 'target',

  state: {
    user :{},
    hangyeData : [],
    chanpinData : [],
    quyuData: [],
    sortKeyData :[],
    orgQueryForm : {},
    orgListForm : {
      sortType : '智能排序',
      mainSort : {},
      subSort : [{}]
    },
    orgQueryList : [],
    orgSimilarForm :{
      comp_name : '',
    },
    trackListForm:{},
    trackQueryList:[],
    //defaultQuyuData : defaultQuyuData,
    defaultChanpinData : [],
    defaultHangyeData : [],
    defaultOrgQueryList : [],
  },



  effects: {
    //login action
    *login({ payload }, { call, put }) {
      const response = yield call(userLogin, payload);
      yield put({
        type: 'loginReducer',
        payload: response,
      });
      // Login successfully
      if (response && response.data && response.data.user) {
        reloadAuthorized();
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = redirect;
            return;
          }
        }
        yield put(routerRedux.replace(redirect || '/'));
      }
    },

    // logout action
    *logout(_, { call, put }) {
      yield call(userLogout);
      yield put({
        type: 'logoutReducer',
        payload: {
          status: false,
          currentAuthority: 'guest',
        },
      });
      reloadAuthorized();
      yield put(
        routerRedux.push({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        })
      );
    },


  },

  reducers: {
    loginReducer(state, { payload }) {
      const user =  null;
      const token =  null;

      localStorage.setItem('token', token);

      if (user) {
        user.avatar = 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png';
        setAuthority('admin');
      }
      else {
        setAuthority('guest');
      }
      const loginStatus =  (user) ? 'ok' : 'error';
      return {
        ...state,
        user,
        token,
        loginStatus,
      };
    },
    logoutReducer(state, { payload }) {
      setAuthority('guest');
      return {
        ...state,
        ...payload,
      };
    },
    getHangyeDataReducer(state, { payload }) {
      let data = [];
      if(payload && payload.data && payload.data.result)
        data = payload.data.result;

      // if (!data || data.length == 0)
      //   data = state.defaultHangyeData;

      return {
        ...state,
        hangyeData : data,
      };
    },

    getChanpinDataReducer(state, { payload }) {
      let data = [];
      if(payload && payload.data && payload.data.result)
        data = payload.data.result;

      // if (!data || data.length == 0)
      //   data = state.defaultChanpinData;

      return {
        ...state,
        chanpinData : data,
      };
    },

    getQuyuDataReducer(state, { payload }) {
      let data = [];
      if(payload && payload.data && payload.data.result)
        data = payload.data.result;

      // if (!data || data.length == 0)
      //   data = state.defaultQuyuData;

      return {
        ...state,
        quyuData : data,
      };
    },

    saveOrgQueryForm(state, { payload }) {
      return {
        ...state,
        orgQueryForm: payload,
      };
    },

    saveSortKeyDataReducer(state, { payload }) {
      let data = [];
      if(payload && payload.data && payload.data.result)
        data = payload.data.result;

      return {
        ...state,
        sortKeyData: data,
      };
    },

    saveOrgQueryList(state, { payload }) {
      let data = {};
      if(payload && payload.data)
        data = payload.data;

      // if (!data || !data.result || data.result.length == 0)
      //   data = state.defaultOrgQueryList.data;

      if (data.result) {
        data.list = data.result;
        data.list.forEach((record, index) => {
          //record.comp_name = record.comp_name + "_" +index;
          let expStrgthFitlers = exptStrgthOptions.filter(kv => kv.label == record.expt_self_strgth);
          if (expStrgthFitlers.length > 0)
            record.expt_self_strgth_value = expStrgthFitlers[0].value;
          else
            record.expt_self_strgth_value = 8;

          let exptStrgth2Fitlers = exptStrgthOptions.filter(kv => kv.label == record.expt_cnsgn_strgth);
          if (exptStrgth2Fitlers.length > 0)
            record.expt_cnsgn_strgth_value = exptStrgth2Fitlers[0].value;
          else
            record.expt_cnsgn_strgth_value = 8;

          // let milgramFilters = milgramOptions.filter(kv => kv.label == record.milgram_indx);
          // if (milgramFilters.length > 0)
          //   record.milgram_indx_value = milgramFilters[0].value;
          // else
          //   record.milgram_indx_value = -1;
        });
        data.result = null;
        // data.pagination = { total: 0, pageSize: 0, current: 1 };
        // data.pagination.total = data.list.length;
        // data.pagination.current = data.page;
        // data.pagination.pageSize = data.pageSize;
      }

      return {
        ...state,
        orgQueryList: data,
      };
    },

    saveOrgSimilarFormReducer(state, { payload }) {
      let data = [];
      if(payload && payload.data && payload.data.result)
        data = payload.data.result[0];

      const orgQueryForm = {};
      orgQueryForm.expt_strgth_id = [data.expt_strgth_id];
      orgQueryForm.dev_year_id = [data.dev_year_id];
      orgQueryForm.grwth_status_id = [data.grwth_status_id];
      orgQueryForm.area_id = data.area_id;
      orgQueryForm.indst_id = [data.indst_id];
      orgQueryForm.prod_id = [data.prod_id];
      orgQueryForm.comp_id = data.comp_id;
      return {
        ...state,
        orgSimilarForm: data,
        orgQueryForm,
      };
    },


    saveTrackListFormReducer(state, { payload }) {
      return {
        ...state,
        trackListForm:payload,
      };
    },

    orgListFormAddSort(state, { payload }) {
      const orgListForm = state.orgListForm;
      orgListForm.subSort.push({key:Date.now()});

      return {
        ...state,
        orgListForm,
      };
    },

    saveTrackQueryListReducer(state, { payload }) {
      let data = {};
      if(payload && payload.data)
        data = payload.data;

      // if (!data || !data.result || data.result.length == 0)
      //   data = state.defaultOrgQueryList.data;

      if (data.result) {
        data.list = data.result;
        data.pagination = { total: 0, pageSize: 0, current: 1 };
        data.pagination.total = data.total;
        data.pagination.pageSize = data.pageSize;
        data.pagination.current = data.currentPage;
        data.result = null;
      }

      return {
        ...state,
        trackQueryList: data,
      };
    },

    updateTrackCommentReducer(state, { payload }) {
      const trackQueryList = state.trackQueryList;
      trackQueryList.list.map( record => {
        if (record.comp_name ==payload.comp_name) {
          record.mkt_comment = payload.mkt_comment;
          record.comp_info.mkt_comment = payload.mkt_comment;
        }
      });

      return {
        ...state,
        trackQueryList: trackQueryList,
      };
    },

    orgListFormSortType(state, { payload }) {
      const orgListForm = state.orgListForm;
      orgListForm.sortType = payload.sortType;

      return {
        ...state,
        orgListForm,
      };
    },

    orgListFormSortItem(state, { payload }) {
      const orgListForm = state.orgListForm;
      if (payload.item.key == 'main')
        orgListForm.mainSort = {...orgListForm.mainSort, ...payload};
      else
        orgListForm.subSort

      return {
        ...state,
        orgListForm,
      };
    },

    saveStepFormData(state, { payload }) {
      return {
        ...state,
        step: {
          ...state.step,
          ...payload,
        },
      };
    },
  },
};

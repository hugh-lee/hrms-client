import { setAuthority } from '@/utils/authority';
import { reloadAuthorized } from '@/utils/Authorized';

import * as SysUserService from '@/pages/Hrms/services/System/SysUserService';
import * as OrgUserService from '@/pages/Hrms/services/Org/OrgService';
import * as CryptoUtils from '@/pages/Hrms/utils/CryptoUtils';

export default {
  namespace: 'sysUser',

  state: {
    loginStatus: undefined,
    loginMessage: undefined,
    context: {
      user: {},
      org: {},
    },
  },

  effects: {
    *login({ payload, callback }, { call, put, select }) {
      let response = yield call(SysUserService.getCode, payload);
      yield put({
        type: SysUserService.getActionName(response),
        payload: response,
      });

      payload.publickey = yield select(state => state.sysUser.context.RSAPublicKey);

      response = yield call(SysUserService.login, payload);
      if (response.body.status == 'online') {
        callback.forceLogin();
        return;
      }

      yield put({
        type: SysUserService.getActionName(response),
        payload: response,
      });

      let loginStatus = yield select(state => state.sysUser.loginStatus);
      if (loginStatus == 'ok') {
        if (callback) callback.getAllCode();

        setAuthority('admin');
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

    *logout({ payload }, { call, put }) {
      const response = yield call(logout, payload);
      yield put({
        type: SysUserService.getActionName(response),
        payload: response,
      });
    },
  },

  reducers: {
    ACTION_GET_CODE(state, { payload }) {
      if (payload && payload.body)
        state.context.RSAPublicKey = CryptoUtils.decodeBase64(payload.body.code);

      return state;
    },

    ACTION_USER_LOGIN(state, { payload }) {
      let loginStatus =
        payload.status == undefined || payload.status.code == '0000' ? 'ok' : 'error';
      let loginMessage = payload.status != undefined ? payload.status.text : '';

      if (payload && payload.body && payload.body.user)
        localStorage.setItem('token', payload.body.user.token);

      if (payload.body.user.personnelPermission) {
        if (payload.body.org.permission == OrgService.OrgPermission.PERMISSION_PERSONNEL_UNIT)
          payload.body.user.isPersonnel = true;
        else if (payload.body.org.permission == OrgService.OrgPermission.PERMISSION_ORG_UNIT)
          payload.body.user.isZZB = true;
      }

      return {
        ...state,
        loginStatus: loginStatus,
        loginMessage: loginMessage,
        context: payload.body,
      };
    },

    system_sysUser_logout(state, action) {
      return {
        ...state,
        currentUser: action.payload || {},
      };
    },

    changeNotifyCount(state, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};

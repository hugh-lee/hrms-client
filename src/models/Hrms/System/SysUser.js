import * as SysUserService from '@/pages/Hrms/services/System/SysUserService';
import * as CryptoUtils from '@/pages/Hrms/utils/CryptoUtils';

export default {
  namespace: 'sysUser',

  state: {
    loginStatus: undefined,
    loginMessage: undefined,
    context: {},
    currentUser: {},
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
      yield put({
        type: SysUserService.getActionName(response),
        payload: response,
      });

      if (callback) callback();
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
      if (payload == undefined || payload.header == undefined) return state;

      let loginStatus =
        payload.status == undefined || payload.status.code == '0000' ? 'ok' : 'error';
      let loginMessage = payload.status != undefined ? payload.status.text : '';

      if (payload && payload.body && payload.body.user)
        localStorage.setItem('token', payload.body.user.token);

      if (payload.body.status == 'online') {
        Modal.confirm({
          title: '用户在线确认',
          content: '用户已经在线，请问是否重新登录？',
          okText: '确认',
          cancelText: '取消',
        });

        //   DialogResult result = MessageBox.Show("用户已经在线，请问是否重新登录？", "用户在线确认", MessageBoxButtons.OKCancel);
        //   if (result == DialogResult.OK)
        //   {
        //     Login(true, false);
        //   }
        //   else
        //   {
        //     this.UserText.Focus();
        //   }
        // }
        // else if (payload.body.status  == "replaceUkey")
        // {
        //   Cursor.Current = Cursors.Default;
        //   DialogResult result = MessageBox.Show("用户已经绑定到一个加密锁，是否替换加密锁？如果替换，原绑定加密锁将不能在使用。", "确认", MessageBoxButtons.OKCancel);
        //   if (result == DialogResult.OK)
        //   {
        //     Login(false, true);
        //   }
        //   else
        //   {
        //     this.UserText.Focus();
        //   }
        // }
        // else if (payload.body.status  == "success")
        // {
        //   HrmsContext.IsLogin = true;
        //   UserService.InitializeData();
        //   HrmsContext.InitData(e.Body);
        //   SysSnInfoContext.InitData(e.Body);
        //
        //   this.ShowMainForm();
      }
      return {
        ...state,
        loginStatus: loginStatus,
        loginMessage: loginMessage,
        currentUser: payload.body,
      };
    },
    handleResponse(state, { payload }) {
      if (payload == undefined || payload.header == undefined) return state;

      //
      if (payload.header.action == SysUserService.ACTION_GET_CODE) {
        if (payload && payload.body)
          state.context.RSAPublicKey = CryptoUtils.decodeBase64(payload.body.code);
      }

      //
      if (payload.header.action == SysUserService.ACTION_USER_LOGIN) {
        let loginStatus =
          payload.status == undefined || payload.status.code == '0000' ? 'ok' : 'error';
        let loginMessage = payload.status != undefined ? payload.status.text : '';

        if (payload && payload.body && payload.body.user)
          localStorage.setItem('token', payload.body.user.token);

        if (payload.body.status == 'online') {
          Modal.confirm({
            title: '用户在线确认',
            content: '用户已经在线，请问是否重新登录？',
            okText: '确认',
            cancelText: '取消',
          });

          //   DialogResult result = MessageBox.Show("用户已经在线，请问是否重新登录？", "用户在线确认", MessageBoxButtons.OKCancel);
          //   if (result == DialogResult.OK)
          //   {
          //     Login(true, false);
          //   }
          //   else
          //   {
          //     this.UserText.Focus();
          //   }
          // }
          // else if (payload.body.status  == "replaceUkey")
          // {
          //   Cursor.Current = Cursors.Default;
          //   DialogResult result = MessageBox.Show("用户已经绑定到一个加密锁，是否替换加密锁？如果替换，原绑定加密锁将不能在使用。", "确认", MessageBoxButtons.OKCancel);
          //   if (result == DialogResult.OK)
          //   {
          //     Login(false, true);
          //   }
          //   else
          //   {
          //     this.UserText.Focus();
          //   }
          // }
          // else if (payload.body.status  == "success")
          // {
          //   HrmsContext.IsLogin = true;
          //   UserService.InitializeData();
          //   HrmsContext.InitData(e.Body);
          //   SysSnInfoContext.InitData(e.Body);
          //
          //   this.ShowMainForm();
        }
        return {
          ...state,
          loginStatus: loginStatus,
          loginMessage: loginMessage,
          currentUser: payload.body,
        };
      }

      return state;
    },

    system_sysUser_login(state, action) {
      return {
        ...state,
        list: action.payload,
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

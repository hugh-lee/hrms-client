import * as ServiceUtils from '../ServiceUtils';
import * as BrowserUtils from '../../utils/BrowserUtils';
import * as CryptoUtils from '../../utils/CryptoUtils';
import * as JSONUtils from '../../utils/JSONUtils';

export const actions = {
  ACTION_GET_USER: 'system.sysUser.getEntry',
  ACTION_GET_USERS: 'system.sysUser.getEntrys',
  ACTION_ADD_USER: 'system.sysUser.addEntry',
  ACTION_UPDATE_USER: 'system.sysUser.updateEntry',
  ACTION_DELETE_USER: 'system.sysUser.deleteEntry',
  ACTION_DISABLE_USERS: 'system.sysUser.disableUsers',
  ACTION_ENABLE_USERS: 'system.sysUser.enableUsers',

  ACTION_CHANGE_PASSWORD: 'system.sysUser.changePassword',
  ACTION_PASSWORD_VALIDATE_CODE: 'system.sysUser.sendResetPasswordValidateCode',
  ACTION_RESET_PASSWORD: 'system.sysUser.resetPassword',
  ACTION_CHANGE_USER_ID: 'system.sysUser.changeUserId',

  ACTION_GET_CODE: 'system.sysUser.getCode',
  ACTION_RESET_LOCK: 'system.sysUser.resetLock',

  ACTION_USER_LOGIN: 'system.sysUser.login',
  ACTION_USER_LOGOUT: 'system.sysUser.logout',
  ACTION_GET_USER_FUNCTIONS: 'system.sysUser.getFunctions',
  ACTION_GET_USER_ROLES: 'system.sysUser.getRoles',

  ACTION_GET_FUNCTION_REALTIME_INFOS: 'system.sysUser.getFunctionRealtimeInfo',
};

export const getActionName = data => {
  let action = typeof data === 'string' ? data : data.header.action;
  return JSONUtils.getValue(actions, action);
};

export async function getCode(params) {
  return ServiceUtils.sendRequest(actions.ACTION_GET_CODE);
}

export async function login(params) {
  //params.password = CryptoUtils.encryptRSA(params.publickey, params.password);
  params.info = BrowserUtils.osInfo;

  const { userId, password, force, info } = params;
  return ServiceUtils.sendRequest(actions.ACTION_USER_LOGIN, {
    userId,
    password,
    force,
    info,
  });
}

export async function logout(params) {
  return ServiceUtils.sendRequest(actions.ACTION_USER_LOGOUT, params);
}

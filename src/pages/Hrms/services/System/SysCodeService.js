import * as ServiceUtils from '../ServiceUtils';
import { ACTION_USER_LOGOUT } from './SysUserService';

export const ACTION_GET_CODE_TYPES = 'system.sysCode.getCodeTypes';

export const ACTION_GET_CODE_VALUES = 'system.sysCode.getCodeValues';
export const ACTION_GET_ALL_CODE_VALUES = 'system.sysCode.getAllCodeValues';

export const ACTION_GET_CODE_VALUE = 'system.sysCode.getEntry';
export const ACTION_ADD_CODE_VALUE = 'system.sysCode.addEntry';
export const ACTION_UPDATE_CODE_VALUE = 'system.sysCode.updateEntry';
export const ACTION_DELETE_CODE_VALUE = 'system.sysCode.deleteEntry';

export async function getAllCodes() {
  return ServiceUtils.sendRequest(ACTION_GET_ALL_CODE_VALUES);
}

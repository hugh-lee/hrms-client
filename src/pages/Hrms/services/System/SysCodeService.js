import * as ServiceUtils from '../ServiceUtils';
import * as JSONUtils from '../../utils/JSONUtils';

export const actions = {
  ACTION_GET_CODE_TYPES: 'system.sysCode.getCodeTypes',

  ACTION_GET_CODE_VALUES: 'system.sysCode.getCodeValues',
  ACTION_GET_ALL_CODE_VALUES: 'system.sysCode.getAllCodeValues',

  ACTION_GET_CODE_VALUE: 'system.sysCode.getEntry',
  ACTION_ADD_CODE_VALUE: 'system.sysCode.addEntry',
  ACTION_UPDATE_CODE_VALUE: 'system.sysCode.updateEntry',
  ACTION_DELETE_CODE_VALUE: 'system.sysCode.deleteEntry',
};

export const getActionName = data => {
  let action = typeof data === 'string' ? data : data.header.action;
  return JSONUtils.getValue(actions, action);
};

export async function getAllCodes() {
  return ServiceUtils.sendRequest(actions.ACTION_GET_ALL_CODE_VALUES);
}

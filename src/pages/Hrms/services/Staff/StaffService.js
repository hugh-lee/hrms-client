import * as ServiceUtils from '../ServiceUtils';
import * as JSONUtils from '../../utils/JSONUtils';

export const actions = {
  ACTION_GET_STAFF: 'staff.staff.getEntry',
  ACTION_GET_STAFFS: 'staff.staff.getEntrys',
  ACTION_GET_STAFF_COUNT: 'staff.staff.getEntryCount',
  ACTION_ADD_STAFF: 'staff.staff.addEntry',
  ACTION_UPDATE_STAFF: 'staff.staff.updateEntry',
  ACTION_DELETE_STAFF: 'staff.staff.deleteEntry',
  ACTION_CANCEL_STAFF: 'staff.staff.cancelEntry',

  ACTION_UPDATE_STAFF_BIRTHDAY: 'staff.staff.updateBirthday',

  ACTION_GET_STAFF_PICTURE: 'staff.staff.getStaffPicture',
  ACTION_SET_STAFF_PICTURE: 'staff.staff.setStaffPicture',

  ACTION_CHECK_STAFF_UNITID: 'staff.staff.checkUnitId',
  ACTION_START_NEW_HIRE_APPLY: 'staff.staff.startNewHireApply',
  ACTION_TRANSFER_STAFFS: 'staff.staff.transferStaffs',

  ACTION_GET_PREPARE_RETIRE_STAFFS: 'staff.staff.getPrepareRetireStaffs',
  ACTION_GET_PREPARE_NOT_LEADER_STAFFS: 'staff.staff.getPrepareNotLeaderStaffs',

  ACTION_IMPORT_STAFFS: 'staff.staff.importStaffs',

  ACTION_CHANGE_STAFF_UNIT: 'staff.staff.changeStaffUnit',
};

export const getActionName = data => {
  let action = typeof data === 'string' ? data : data.header.action;
  return JSONUtils.getValue(actions, action);
};

export async function getStaffs(params) {
  return ServiceUtils.sendRequest(actions.ACTION_GET_STAFFS, params);
}

import * as ServiceUtils from '../ServiceUtils';
import * as JSONUtils from '../../utils/JSONUtils';

export const actions = {
  ACTION_GET_ORG: 'org.org.getOrg',
  ACTION_CREATE_ORG: 'org.org.createOrg',
  ACTION_UPDATE_ORG: 'org.org.updateOrg',
  ACTION_MERGE_ORG: 'org.org.mergeOrg',
  ACTION_TRANSFER_ORG: 'org.org.transferOrg',
  ACTION_DELETE_ORG: 'org.org.deleteOrg',
  ACTION_CANCEL_ORG: 'org.org.cancelOrg',
  ACTION_LOCK_ORG: 'org.org.lockOrg',
  ACTION_LOCK_STAFF: 'org.org.lockStaff',

  ACTION_CREATE_CITY: 'org.org.createCity',
  ACTION_CREATE_CENTER_UNIT: 'org.org.createCenterUnit',
  ACTION_CREATE_PERSONNEL_UNIT: 'org.org.createPersonnelUnit',
  ACTION_CREATE_COMPETENT_UNIT: 'org.org.createCompetentUnit',
  ACTION_CREATE_BASIC_UNIT: 'org.org.createBasicUnit',
  ACTION_CREATE_CENTER_DEPARTMENT: 'org.org.createCenterDepartment',
  ACTION_CREATE_DEPARTMENT: 'org.org.createDepartment',

  ACTION_CREATE_SECTION: 'org.org.createSection',

  ACTION_GET_ORG_TREES: 'org.org.getOrgTrees',
  ACTION_GET_ALL_ORG_TREES: 'org.org.getAllOrgTrees',
  ACTION_GET_ORGS: 'org.org.getEntrys',
  ACTION_GET_REAL_UNIT_ORGS: 'org.org.getRealUnitEntrys',
  ACTION_GET_ADMIN_UNIT_ORGS: 'org.org.getAdminUnitEntrys',
  ACTION_GET_WORK_UNIT_ORGS: 'org.org.getWorkUnitEntrys',

  ACTION_GET_HR_PARENT_UNITS: 'org.org.getHrParentUnits',

  ACTION_IMPORT_ORG_INFO: 'org.org.importOrgInfo',
};

export const UnitQuery = {
  UNIT_QUERY_TYPE: 'query_type', // 查询类型

  UNIT_ALL: 'unit_all', // 所有单位
  UNIT_SELF: 'unit_self', // 当前单位及挂靠的单位

  INCLUDE_SUB_UNITS: 'include_sub_units', //是否包含所管理的下属单位
  INCLUDE_WORK_UNIT: 'include_work_unit', //只包含事业单位
  INCLUDE_ADMIN_UNIT: 'include_admin_unit', //只包含机关单位
  INCLUDE_UNLOCK_UNIT: 'include_unlock_unit', //包含未锁定单位
  INCLUDE_COMPENTENT_UNIT: 'include_compentent_unit', //只包含党政群机关单位
  INCLUDE_CENTER_UNIT: 'include_center_unit', // 只包含归口单位

  EXCLUDE_UPPER_CENTER_UNIT: 'exclude_upper_center_unit', //不包含上层归口单位
  EXCLUDE_DEPENDENT_UNIT: 'exclude_dependent_unit', //不包含挂靠单位
  EXCLUDE_CENTER_UNIT: 'exclude_center_unit', //不包含归口单位

  INCLUDE_DEP: 'include_dep', //是否包含部门

  IN_SYSTEM: 'in_system', //系统内部
  IN_CITY: 'in_city', //市内
};

// 权限类型permission_type
export const OrgPermissionType = {
  PERMISSION_TYPE_PERSONNEL_UNIT: '1', // 人事主管单位：人事局或组织部
  PERMISSION_TYPE_COMPETENT_UNIT: '2', // 主管单位
  PERMISSION_TYPE_BASIC_ADMIN_UNIT: '3', // 基层单位
};

// 权限类型permission
export const OrgPermission = {
  PERMISSION_ORG_UNIT: '1', // 组织部
  PERMISSION_PERSONNEL_UNIT: '2', // 人事局
  PERMISSION_ADMIN_UNIT: '3', // 公务员局
  PERMISSION_COMPETENT_UNIT: '4', // 机关主管部门
  PERMISSION_BASIC_ADMIN_UNIT: '5', // 公务员单位
  PERMISSION_BASIC_WORK_UNIT: '6', // 事业单位
  PERMISSION_ADMIN_WORK_UNIT: '7', // 参照公务员管理事业单位
  PERMISSION_ENTERPRISE_WORK_UNIT: '8', // 企业化管理事业单位
};

// 权限类型permission_type
export const OrgProperty = {
  ADMIN_DZQ_UNIT: '10', // 党政群机关单位
  ADMIN_OTHER_UNIT: '11', // 其他机关单位
  WORK_UNIT: '12', // 事业单位
  WORK_ADMIN_UNIT: '13', // 参照公务员管理事业单位
  WORK_ENTERPRISE_UNIT: '14', // 企业化管理事业单位
  WORK_OTHER_UNIT: '19', // 其他事业单位
};

export const isAdmin = property => {
  return OrgProperty.ADMIN_DZQ_UNIT == property || OrgProperty.ADMIN_OTHER_UNIT == property;
};

export const getActionName = data => {
  let action = typeof data === 'string' ? data : data.header.action;
  return JSONUtils.getValue(actions, action);
};

export async function getOrgTrees(params) {
  return ServiceUtils.sendRequest(actions.ACTION_GET_ORG_TREES, params);
}

import React, { Component } from 'react';
import { connect } from 'dva';
import { Tree } from 'antd';
import * as OrgService from '../../services/Org/OrgService';

const { TreeNode } = Tree;

@connect(({ orgTree, sysUser, loading }) => ({
  orgTree,
  sysUser,
  submitting: loading.models.org,
}))
export default class OrgTreePanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orgTrees: [],
      expandedKeys: [],
      autoExpandParent: true,
      checkedKeys: [],
      selectedKeys: [],
    };

    this.props.onRef(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    this.getTreeData();
  }

  getTreeData = () => {
    const {
      sysUser,
      orgTree,
      orgId,
      unitQueryType,
      includeDep,
      excludeDep,
      force,
      includeSubs,
    } = this.props;

    const params = {};
    if (orgId) params.id = orgId;

    if (unitQueryType) params[OrgService.UnitQuery.UNIT_QUERY_TYPE] = unitQueryType;

    if (sysUser.context.user.personnelPermission && !includeDep)
      params[OrgService.UnitQuery.UNIT_QUERY_TYPE] = OrgService.UnitQuery.UNIT_ALL;

    if (includeDep) params[OrgService.UnitQuery.INCLUDE_DEP] = true;

    if (!sysUser.context.org.competentUnit && !excludeDep)
      params[OrgService.UnitQuery.INCLUDE_DEP] = true;

    if (!force) {
      if (
        params[OrgService.UnitQuery.INCLUDE_DEP] != null &&
        params[OrgService.UnitQuery.INCLUDE_DEP] == true
      )
        params['version'] = orgTree.DepEntrysVersion;
      else params['version'] = orgTree.OrgEntrysVersion;
    } else {
      params['force'] = force;
    }

    if (includeSubs) params[OrgService.UnitQuery.INCLUDE_SUB_UNITS] = true;

    //if (includeUnlockedUnit)
    //    data[UnitQuery.INCLUDE_UNLOCK_UNIT] = true;

    //if (includeAdminUnit)
    //    data[UnitQuery.INCLUDE_ADMIN_UNIT] = true;

    //if (includeWorkUnit)
    //    data[UnitQuery.INCLUDE_WORK_UNIT] = true;

    //if (includeCompetentUnit)
    //    data[UnitQuery.INCLUDE_COMPENTENT_UNIT] = true;

    //if (excludeDependentUnit)
    //    data[UnitQuery.EXCLUDE_DEPENDENT_UNIT] = true;

    //if (excludeCenterUnit)
    //    data[UnitQuery.EXCLUDE_CENTER_UNIT] = true;

    //if (excludeUpperCenterUnit)
    //    data[UnitQuery.EXCLUDE_UPPER_CENTER_UNIT] = true;

    const { dispatch } = this.props;
    dispatch({
      type: 'orgTree/getOrgTrees',
      payload: params,
      callback: () => {
        const {
          orgTree: { orgTrees },
        } = this.props;
        const expandedKeys = orgTrees && orgTrees.length > 0 ? [orgTrees[0].id] : [];
        const selectedKeys = expandedKeys;
        this.setState({
          expandedKeys,
          selectedKeys,
        });
        this.props.onChange(orgTrees[0]);
      },
    });
  };

  onExpand = expandedKeys => {
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  };

  onCheck = checkedKeys => {
    this.setState({ checkedKeys });
  };

  onSelect = (selectedKeys, info) => {
    const { onChange } = this.props;
    this.setState({ selectedKeys });

    onChange(info.node.props.dataRef);
  };

  renderTreeNodes = orgTrees =>
    orgTrees.map(item => {
      if (item.subs) {
        return (
          <TreeNode title={item.name} key={item.id} dataRef={item}>
            {this.renderTreeNodes(item.subs)}
          </TreeNode>
        );
      }
      return <TreeNode {...item} />;
    });

  render() {
    const {
      orgTree: { orgTrees },
    } = this.props;
    return (
      <Tree
        defaultExpandParent={true}
        onExpand={this.onExpand}
        expandedKeys={this.state.expandedKeys}
        autoExpandParent={this.state.autoExpandParent}
        onCheck={this.onCheck}
        checkedKeys={this.state.checkedKeys}
        onSelect={this.onSelect}
        selectedKeys={this.state.selectedKeys}
      >
        {this.renderTreeNodes(orgTrees)}
      </Tree>
    );
  }
}

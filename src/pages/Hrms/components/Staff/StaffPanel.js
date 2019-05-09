import React, { Component } from 'react';

import { Form, Layout } from 'antd/lib/index';
import { connect } from 'dva/index';

import StaffTable from './StaffTable';
import OrgTreePanel from '../org/OrgTreePanel';

import styles from './StaffPanel.less';
import classNames from 'classnames';

const { Header, Footer, Sider, Content } = Layout;

@connect(({ staff, sysCode, loading }) => ({
  staff,
  sysCode,
  submitting: loading.models.sysUser || loading.models.sysCode,
}))
export default class StaffPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { dispatch } = this.props;
  }

  refreshStaffTable = currentOrg => {
    this.staffTable.refreshStaffTable({ currentOrg });
  };

  render() {
    const { logo, collapsed, onCollapse, fixSiderbar, theme, isMobile } = this.props;

    return (
      <Layout style={{ height: '100%' }}>
        <Sider theme="light" className={styles.sider}>
          <OrgTreePanel
            onChange={this.refreshStaffTable}
            onRef={ref => {
              this.orgTreePanel = ref;
            }}
          />
        </Sider>
        <Layout>
          <Content
            style={{ overflow: 'initial', paddingLeft: '4px' }}
            className={styles.customAntCard}
          >
            <StaffTable
              onRef={ref => {
                this.staffTable = ref;
              }}
            />
          </Content>
        </Layout>
      </Layout>
    );
  }
}

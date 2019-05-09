import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';

import { Form, Input, Select, Tabs, Steps, Radio } from 'antd';

import StaffPanel from '@/pages/Hrms/components/Staff/StaffPanel';

import styles from './StaffBuildPage.less';

/* eslint react/no-multi-comp:0 */
@connect(({ staff, loading }) => ({
  staff,
  loading: loading.models.staff,
}))
@Form.create()
class StaffBuildPage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <Fragment>
        <StaffPanel />
      </Fragment>
    );
  }
}

export default StaffBuildPage;

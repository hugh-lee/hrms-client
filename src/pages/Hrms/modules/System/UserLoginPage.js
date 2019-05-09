import React, { Component } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage, setLocale } from 'umi/locale';

import { Alert, Icon } from 'antd';
import Login from '@/components/Login';
import styles from './UserLoginPage.less';

const { UserName, Password, Submit } = Login;

setLocale('zh-CN');

@connect(({ sysUser, sysCode, loading }) => ({
  sysUser,
  sysCode,
  submitting: loading.models.sysUser || loading.models.sysCode,
}))
class LoginPage extends Component {
  state = {
    type: 'account',
    autoLogin: true,
  };

  initialize = () => {
    const { sysUser, dispatch } = this.props;
    if (sysUser.loginStatus != 'error') {
      dispatch({
        type: 'sysCode/initialize',
      });
    }
  };

  handleSubmit = (err, values) => {
    const { type } = this.state;
    if (!err) {
      const { dispatch } = this.props;
      dispatch({
        type: 'sysUser/login',
        payload: {
          ...values,
          force: false,
          //approach: 'web',
        },
        callback: this.initialize,
      });
    }
  };

  changeAutoLogin = e => {
    this.setState({
      autoLogin: e.target.checked,
    });
  };

  renderMessage = content => (
    <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
  );

  render() {
    const { sysUser, submitting } = this.props;
    const { type, autoLogin } = this.state;
    return (
      <div className={styles.main}>
        <Login
          defaultActiveKey={type}
          onTabChange={this.onTabChange}
          onSubmit={this.handleSubmit}
          ref={form => {
            this.loginForm = form;
          }}
        >
          <div />
          <div key="account" tab={formatMessage({ id: 'app.login.tab-login-credentials' })}>
            {sysUser.loginStatus === 'error' &&
              !submitting &&
              this.renderMessage(sysUser.loginMessage)}
            <UserName
              name="userId"
              placeholder={`${formatMessage({ id: 'app.login.userName' })}: `}
              rules={[
                {
                  required: true,
                  message: formatMessage({ id: 'validation.userName.required' }),
                },
              ]}
            />
            <Password
              name="password"
              placeholder={`${formatMessage({ id: 'app.login.password' })}: `}
              rules={[
                {
                  required: true,
                  message: formatMessage({ id: 'validation.password.required' }),
                },
              ]}
              onPressEnter={() => this.loginForm.validateFields(this.handleSubmit)}
            />
          </div>

          <div />
          <Submit loading={submitting}>
            <FormattedMessage id="app.login.login" />
          </Submit>
        </Login>
      </div>
    );
  }
}

export default LoginPage;
import React, { PureComponent, Fragment } from 'react';
import { Row, Col, Card, Form, Input, Select, Icon, Menu, Button, Dropdown, message } from 'antd';
import { connect } from 'dva/index';
import StandardTable from '@/components/StandardTable';
import * as StaffData from './StaffData';

import styles from './StaffTable.less';

const FormItem = Form.Item;

@connect(({ staff, sysCode, loading }) => ({
  staff,
  sysCode,
  submitting: loading.models.staff || loading.models.sysCode,
}))
@Form.create()
export default class StaffTable extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
      updateModalVisible: false,
      expandForm: false,
      selectedRows: [],
      formValues: {},
      stepFormValues: {},
      formValues: {},
      queryField: StaffData.QueryFields,
      columns: StaffData.TableColumns,
      currentOrg: {},
    };

    this.props.onRef(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    this.initColumns();
  }

  initColumns = () => {
    const { dispatch, status } = this.props;
  };

  refreshStaffTable = ({ pageNo, pageSize, currentOrg }) => {
    const { staff, dispatch } = this.props;

    currentOrg = currentOrg || this.state.currentOrg;
    this.setState({ currentOrg });

    pageNo = pageNo || staff.pagination.pageNo;
    pageSize = pageSize || staff.pagination.pageSize;
    const params = {
      ...this.state.queryData,
      orgId: currentOrg.id,
      sortType: this.state.sortType,
      pageNo: pageNo,
      pageSize: pageSize,
    };

    dispatch({
      type: 'staff/getStaffs',
      payload: params,
    });
  };

  handleTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;

    this.refreshStaffTable({
      pageNo: pagination.current,
      pageSize: pagination.pageSize,
    });
  };

  handleQueryItemChange = e => {
    // this.setState({
    //   expandForm: !expandForm,
    // });
  };

  handleMenuClick = e => {
    const { dispatch } = this.props;
    const { selectedRows } = this.state;

    if (selectedRows.length === 0) return;
    switch (e.key) {
      case 'remove':
        dispatch({
          type: 'rule/remove',
          payload: {
            key: selectedRows.map(row => row.key),
          },
          callback: () => {
            this.setState({
              selectedRows: [],
            });
          },
        });
        break;
      default:
        break;
    }
  };

  handleSearch = e => {
    e.preventDefault();

    const { dispatch, form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;

      this.refreshStaffTable({});
    });
  };

  handleDeleteClick = fields => {
    const { dispatch } = this.props;
    dispatch({
      type: 'target/updateTrack',
      payload: {
        ...fields,
      },
    });

    this.handleModalVisible();
  };

  handleUpdate = fields => {
    const { dispatch } = this.props;
    dispatch({
      type: 'rule/update',
      payload: {
        name: fields.name,
        desc: fields.desc,
        key: fields.key,
      },
    });

    message.success('配置成功');
    this.handleUpdateModalVisible();
  };

  renderQueryForm = () => {
    const {
      form: { getFieldDecorator },
      sysCode,
    } = this.props;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="姓名">
              {getFieldDecorator('name')(
                <Input placeholder="请输入" onChange={this.handleQueryItemChange} />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="身份岗位">
              {getFieldDecorator('jobTypeName')(
                <Select
                  placeholder="请选择"
                  style={{ width: '100%' }}
                  onChange={this.handleQueryItemChange}
                >
                  {sysCode.codes['AE'] &&
                    sysCode.codes['AE'].map(code => (
                      <Option value={code.Id} key={code.Id}>
                        {code.Name}
                      </Option>
                    ))}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  };

  render() {
    const { staff, loading } = this.props;
    const data = { list: staff.entrys, pagination: staff.pagination };
    data.pagination.position = 'bottom';

    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        <Menu.Item key="remove">删除</Menu.Item>
        <Menu.Item key="approval">批量审批</Menu.Item>
      </Menu>
    );

    return (
      <Fragment>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderQueryForm()}</div>
            <div className={styles.tableListOperator}>
              <Button onClick={this.handleDeleteClick}>批量删除</Button>
              <span>
                <Button>批量操作</Button>
                <Dropdown overlay={menu}>
                  <Button>
                    更多操作 <Icon type="down" />
                  </Button>
                </Dropdown>
              </span>
            </div>
            <StandardTable
              rowKey={'id'}
              selectedRows={this.state.selectedRows}
              loading={loading}
              data={data}
              columns={this.state.columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleTableChange}
              scroll={{ x: 2500, y: 400 }}
              size={'small'}
            />
          </div>
        </Card>
      </Fragment>
    );
  }
}

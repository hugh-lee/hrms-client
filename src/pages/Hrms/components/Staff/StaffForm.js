import styles from './StaffForm.less';
import { Form } from 'antd/lib/index';

class StaffForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  okHandle = () => {
    const { form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleAdd(fieldsValue);
    });
  };
  handleAddTrack = () => {
    const { form } = this.props;
    form.validateFields((err, fieldsValue) => {
      const newValues = { ...values, ...fieldsValue };
      handleAdd(newValues);
    });
  };

  render() {
    return (
      <Modal
        destroyOnClose
        title={values.comp_name}
        visible={modalVisible}
        onOk={okHandle}
        onCancel={() => handleModalVisible()}
        width="754px"
        footer={null}
      >
        <Tabs type="card">
          <TabPane tab="企业基本信息" key="1">
            <table
              className={styles.tableDetail}
              style={{ width: '700px', padding: '5px' }}
              border="1"
            >
              <tbody>
                <tr>
                  <td width="20%" align="right">
                    法人
                  </td>
                  <td width="30%">{values.fr_name}</td>
                  <td width="20%" align="right">
                    工商注册号
                  </td>
                  <td width="30%">{values.regno}</td>
                </tr>
                <tr>
                  <td align="right">纳税人识别号</td>
                  <td>{values.NSRSBH}</td>
                  <td align="right">统一社会信用代码</td>
                  <td>{values.credit_code}</td>
                </tr>
                <tr>
                  <td align="right">注册资本</td>
                  <td>{values.reg_cap}</td>
                  <td align="right">实缴资本</td>
                  <td>{values.rec_cap}</td>
                </tr>
                <tr>
                  <td align="right">经营状态</td>
                  <td>{values.ent_status}</td>
                  <td align="right">成立日期</td>
                  <td>{values.esdate}</td>
                </tr>
                <tr>
                  <td align="right">公司类型</td>
                  <td>{values.ent_type}</td>
                  <td align="right">所属行业</td>
                  <td>{values.industry_co_name}</td>
                </tr>
                <tr>
                  <td align="right">所属地区</td>
                  <td>{values.district}</td>
                  <td align="right">英文名</td>
                  <td>{values.nsrmc_en}</td>
                </tr>
                <tr>
                  <td align="right">联系电话</td>
                  <td>{values.tel}</td>
                  <td align="right">电子邮箱</td>
                  <td>{values.email}</td>
                </tr>
                <tr>
                  <td align="right">企业地址</td>
                  <td colSpan="3">{values.dom}</td>
                </tr>
                <tr height="80px">
                  <td align="right">经营范围</td>
                  <td colSpan="3">{values.abu_item}</td>
                </tr>
              </tbody>
            </table>
          </TabPane>
          <TabPane tab="业务信息" key="2">
            <table
              className={styles.tableDetail}
              style={{ width: '700px', padding: '5px' }}
              border="1"
            >
              <tbody>
                <tr>
                  <td width="20%" align="right">
                    总体实力
                  </td>
                  <td width="30%">{values.tot_trd_strgth}</td>
                  <td width="20%" align="right">
                    总体成长类型
                  </td>
                  <td width="30%">{values.tot_trd_grwth_status}</td>
                </tr>
                <tr>
                  <td align="right">外贸自营实力</td>
                  <td>{values.expt_self_strgth}</td>
                  <td align="right">外贸自营成长类型</td>
                  <td>{values.expt_self_grwth_status}</td>
                </tr>
                <tr>
                  <td align="right">外贸代理实力</td>
                  <td>{values.expt_cnsgn_strgth}</td>
                  <td align="right">外贸代理成长类型</td>
                  <td>{values.expt_cnsgn_grwth_status}</td>
                </tr>
                <tr>
                  <td align="right">产品类别</td>
                  <td>{values.prod_cate}</td>
                  <td align="right">主营产品</td>
                  <td>{values.prod_name}</td>
                </tr>
                <tr>
                  <td align="right">Milgram指数</td>
                  <td>{values.milgram_indx}</td>
                  <td align="right">
                    <span style={{ display: values.similarity ? '' : 'none' }}>企业相似度</span>
                  </td>
                  <td>
                    <span style={{ display: values.similarity ? '' : 'none' }}>
                      {values.similarity}
                    </span>
                  </td>
                </tr>
                <tr height="80px">
                  <td align="right">营销建议</td>
                  <td colSpan="3">
                    <span
                      dangerouslySetInnerHTML={{
                        __html: (values.mkt_sgst + '').replace(/;/g, ';<br>'),
                      }}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </TabPane>
        </Tabs>
        <Divider />
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          style={{ marginBottom: 10 }}
          label="备注"
        >
          {form.getFieldDecorator('mkt_comment', { initialValue: values.mkt_comment })(
            <TextArea rows={4} placeholder="请输入" />
          )}
        </FormItem>
        <FormItem style={{ textAlign: 'center', marginBottom: 1 }}>
          <Button type="primary" htmlType="submit" onClick={() => handleAddTrack()}>
            加入跟踪列表
          </Button>
        </FormItem>
      </Modal>
    );
  }
}

export default Form.create()(StaffForm);

import request from '@/utils/request';

//const api = '';
const api = '/hrms';

export const sendRequest = (action, params) => {
  let sdo = { header: {}, body: {} };
  sdo.header.action = action;
  sdo.header.token = localStorage.getItem('token');
  sdo.header.requestTime = new Date().getTime();
  sdo.header.user = 'cskzxxx';
  sdo.body = params || {};

  let formData = new FormData();
  formData.append('request', JSON.stringify(sdo));

  return request(api, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    body: formData,
  });
};

import JSEncrypt from 'jsencrypt';
import { Base64 } from 'js-base64';

export const encryptRSA = (key, text) => {
  let encrypt = new JSEncrypt();
  encrypt.setPublicKey(key);
  return encrypt.encrypt(text);
};

export const encodeBase64 = text => {
  return Base64.encode(text);
};

export const decodeBase64 = text => {
  return Base64.decode(text);
};

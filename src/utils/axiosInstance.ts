// 请求
import axios, { AxiosInterceptorOptions, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import qs from 'qs';
import { message, Modal } from 'antd';
import login from './login';

function onError(msg: string) {
  message.error(msg);
}

// const ORG = 'http://120.78.199.156:8081';
const ORG = '';

const request = axios.create({
  baseURL: ORG,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  },
  paramsSerializer: (params) => {
    return qs.stringify(params, { indices: false });
  }
});


// 可以做接口权限验证
// request.interceptors.request.use(async (config: any) => {
//   // TODO 权限验证
//   return config;
// });


// 请求头加东西
request.interceptors.request.use(
  async (config: InternalAxiosRequestConfig<any>) => {
    config.headers = {
      ...config.headers,
      token: localStorage.getItem('Authorization')
    } as any;
    if (config.headers?.['Content-Type'] === 'application/x-www-form-urlencoded') {
      config.data = qs.stringify(config.data);
    }
    return config;
  },
  (err) => Promise.reject(err)
);

// 同意处理响应 根据返回结果修改
request.interceptors.response.use(
  (response: AxiosResponse): any => {
    if (response.status === 200) {
      if ((response.config as any).portal) {
        return Promise.resolve(response.data);
      }
      if (response.data.code === 200) {
        return Promise.resolve(response.data.data);
      } else if (response.data.msg.indexOf('token 无效') !== -1 || response.data.msg.indexOf('未能读取到有效 token') !== -1) { // token 失效 根据接口返回结果修修改
        Modal.info({
          centered: true,
          title: '会话超时，请重新登陆!',
          maskClosable: false,
          onOk() {
            login.navigatorLoginPage();
          }
        });
      } else {
        onError(response.data.msg);
      }
      return Promise.reject(response.data);
    }
  },
  (error) => {
    const msg = (error.response && error.response.data.msg) || error.message;
    onError(msg);
    return Promise.reject(error);
  }
);


export default request;

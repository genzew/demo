import config from '../config/index';
import { getStorageToken, clearStorageToken } from './auth';
import mockHandler from '../mock/index';

function realRequest(options) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${config.baseUrl}${options.url}`,
      method: options.method || 'GET',
      data: options.data,
      header: {
        'Content-Type': 'application/json',
        Authorization: getStorageToken() ? `Bearer ${getStorageToken()}` : '',
        ...(options.header || {})
      },
      timeout: 15000,
      success: (res) => {
        if (res.statusCode !== 200) {
          wx.showToast({ title: `网络异常 ${res.statusCode}`, icon: 'none' });
          reject(res);
          return;
        }
        const body = res.data || {};
        if (body.code === 0) {
          resolve(body.data);
        } else if (body.code === 401) {
          clearStorageToken();
          wx.navigateTo({ url: '/pages/login/index' });
          reject(body);
        } else {
          if (!options.silent) {
            wx.showToast({ title: body.message || '请求失败', icon: 'none' });
          }
          reject(body);
        }
      },
      fail: (err) => {
        wx.showToast({ title: '网络连接失败', icon: 'none' });
        reject(err);
      }
    });
  });
}

function mockRequest(options) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const data = mockHandler(options.url, options.method || 'GET', options.data || {});
        resolve(data);
      } catch (e) {
        if (!options.silent) {
          wx.showToast({ title: e.message || 'mock 错误', icon: 'none' });
        }
        reject(e);
      }
    }, options.mockDelay != null ? options.mockDelay : 300);
  });
}

function request(options) {
  if (options.loading) {
    wx.showLoading({ title: typeof options.loading === 'string' ? options.loading : '加载中', mask: true });
  }
  const promise = config.useMock ? mockRequest(options) : realRequest(options);
  return promise.finally(() => {
    if (options.loading) wx.hideLoading();
  });
}

export default {
  get: (url, data, opts = {}) => request({ url, method: 'GET', data, ...opts }),
  post: (url, data, opts = {}) => request({ url, method: 'POST', data, ...opts }),
  put: (url, data, opts = {}) => request({ url, method: 'PUT', data, ...opts }),
  del: (url, data, opts = {}) => request({ url, method: 'DELETE', data, ...opts })
};

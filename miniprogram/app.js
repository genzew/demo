import config from './config/index';
import { getStorageToken, setStorageToken, clearStorageToken } from './utils/auth';

App({
  globalData: {
    config,
    userInfo: null,
    location: null,
    systemInfo: null
  },

  onLaunch() {
    try {
      this.globalData.systemInfo = wx.getSystemInfoSync();
    } catch (e) {}

    const token = getStorageToken();
    if (token) {
      this.globalData.token = token;
    }

    wx.getLocation({
      type: 'gcj02',
      success: (res) => {
        this.globalData.location = { latitude: res.latitude, longitude: res.longitude };
      },
      fail: () => {}
    });
  },

  setToken(token) {
    setStorageToken(token);
    this.globalData.token = token;
  },

  clearLogin() {
    clearStorageToken();
    this.globalData.token = null;
    this.globalData.userInfo = null;
  }
});

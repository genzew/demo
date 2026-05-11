import { fetchProfile } from '../../api/user';
import { isLoggedIn, getUserInfo, clearStorageToken } from '../../utils/auth';

Page({
  data: {
    user: null,
    logged: false
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ active: 3 });
    }
    this.refresh();
  },

  async refresh() {
    if (isLoggedIn()) {
      let user = getUserInfo();
      if (!user) user = await fetchProfile();
      this.setData({ user, logged: true });
    } else {
      this.setData({ user: null, logged: false });
    }
  },

  goLogin() {
    wx.navigateTo({ url: '/pages/login/index' });
  },

  navigate(e) {
    const { url } = e.currentTarget.dataset;
    if (url) wx.navigateTo({ url });
  },

  async onLogout() {
    const ret = await wx.showModal({ title: '提示', content: '确定退出登录？' });
    if (!ret.confirm) return;
    clearStorageToken();
    this.refresh();
  },

  onShareAppMessage() {
    return {
      title: '邀请你来体验包厢预订',
      path: '/pages/index/index'
    };
  }
});

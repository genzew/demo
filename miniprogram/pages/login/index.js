import { wxLogin } from '../../api/user';
import { setStorageToken, setUserInfo } from '../../utils/auth';

Page({
  data: {
    agreed: false,
    loading: false
  },

  onAgreeChange(e) {
    this.setData({ agreed: e.detail });
  },

  async onWxLogin() {
    if (!this.data.agreed) {
      wx.showToast({ title: '请先同意用户协议', icon: 'none' });
      return;
    }
    this.setData({ loading: true });
    try {
      // 真实场景：先 wx.login 拿 code，再换 token
      const res = await wxLogin({ code: 'mock-code' });
      setStorageToken(res.token);
      setUserInfo(res.user);
      wx.showToast({ title: '登录成功' });
      setTimeout(() => wx.navigateBack(), 600);
    } catch (e) {
    } finally {
      this.setData({ loading: false });
    }
  },

  onPolicy() {
    wx.showModal({ title: '用户协议', content: '此处为协议占位文本…', showCancel: false });
  }
});

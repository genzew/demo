import { fetchInviteInfo } from '../../api/misc';

Page({
  data: { info: null },

  async onLoad() {
    const info = await fetchInviteInfo();
    this.setData({ info });
  },

  copyCode() {
    if (!this.data.info) return;
    wx.setClipboardData({ data: this.data.info.inviteCode });
  },

  onShareAppMessage() {
    return {
      title: '点这里领30元包厢券',
      path: '/pages/index/index?ref=' + (this.data.info && this.data.info.inviteCode || '')
    };
  }
});

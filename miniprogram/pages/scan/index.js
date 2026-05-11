import { openDoor } from '../../api/device';

Page({
  data: {},

  onLoad() {
    this.scan();
  },

  scan() {
    wx.scanCode({
      onlyFromCamera: false,
      scanType: ['qrCode'],
      success: async (res) => {
        try {
          await openDoor({ qrcode: res.result });
          wx.showToast({ title: '开门成功', icon: 'success' });
          setTimeout(() => wx.navigateBack(), 1200);
        } catch (e) {}
      },
      fail: () => {
        wx.navigateBack();
      }
    });
  },

  rescan() {
    this.scan();
  }
});

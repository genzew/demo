Page({
  data: {
    pushEnabled: true,
    locationEnabled: true,
    privacyEnabled: false,
    version: '1.0.0'
  },

  onPushChange(e) { this.setData({ pushEnabled: e.detail }); },
  onLocChange(e)  { this.setData({ locationEnabled: e.detail }); },
  onPrivChange(e) { this.setData({ privacyEnabled: e.detail }); },

  onClearCache() {
    wx.showModal({
      title: '清除缓存',
      content: '确认清除小程序缓存？',
      success: (r) => {
        if (r.confirm) {
          wx.clearStorageSync();
          wx.showToast({ title: '已清除' });
        }
      }
    });
  },

  onAbout() {
    wx.showModal({ title: '关于', content: '包厢预订小程序 v1.0.0', showCancel: false });
  }
});

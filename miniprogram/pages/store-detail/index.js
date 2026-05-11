import { fetchStoreDetail } from '../../api/store';

Page({
  data: {
    store: null,
    activeImg: 0
  },

  onLoad(query) {
    this.storeId = query.id;
    this.load();
  },

  async load() {
    try {
      wx.showLoading({ title: '加载中', mask: true });
      const store = await fetchStoreDetail(this.storeId);
      this.setData({ store });
    } finally {
      wx.hideLoading();
    }
  },

  onCallPhone() {
    if (!this.data.store) return;
    wx.makePhoneCall({ phoneNumber: this.data.store.phone });
  },

  onOpenLocation() {
    const s = this.data.store;
    if (!s) return;
    wx.openLocation({
      latitude: s.latitude,
      longitude: s.longitude,
      name: s.name,
      address: s.address
    });
  },

  onPreviewImage(e) {
    const { current } = e.currentTarget.dataset;
    wx.previewImage({ current, urls: this.data.store.images });
  },

  onPickRoom(e) {
    const { id } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/booking-confirm/index?storeId=${this.storeId}&roomId=${id}`
    });
  }
});

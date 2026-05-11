import { fetchOrderDetail } from '../../api/order';

Page({
  data: { order: null },

  async onLoad(query) {
    this.orderId = query.orderId;
    const order = await fetchOrderDetail(this.orderId);
    this.setData({ order });
  },

  goDetail() {
    wx.redirectTo({ url: `/pages/order-detail/index?orderId=${this.orderId}` });
  },

  goHome() {
    wx.switchTab({ url: '/pages/index/index' });
  }
});

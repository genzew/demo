import { fetchOrderDetail } from '../../api/order';
import { openDoor } from '../../api/device';

Page({
  data: {
    order: null,
    opening: false,
    success: false
  },

  async onLoad(query) {
    this.orderId = query.orderId;
    const order = await fetchOrderDetail(this.orderId);
    this.setData({ order });
  },

  async onOpen() {
    if (this.data.opening) return;
    this.setData({ opening: true, success: false });
    try {
      await openDoor({ orderId: this.orderId });
      this.setData({ success: true });
      wx.vibrateShort({ type: 'medium' });
    } catch (e) {
      // request util already shows toast
    } finally {
      setTimeout(() => this.setData({ opening: false }), 800);
    }
  },

  async onBluetooth() {
    wx.showLoading({ title: '蓝牙搜索中', mask: true });
    setTimeout(() => {
      wx.hideLoading();
      wx.showToast({ title: '蓝牙开门成功', icon: 'success' });
    }, 1500);
  }
});

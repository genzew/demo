import { fetchOrderDetail } from '../../api/order';
import { cancelBooking, extendBooking, payBooking } from '../../api/booking';
import { fetchDoorCode } from '../../api/device';

const STATUS_LABEL = {
  pending_pay: '待支付',
  paid: '已支付',
  in_use: '使用中',
  finished: '已完成',
  cancelled: '已取消'
};

Page({
  data: {
    order: null,
    statusLabel: STATUS_LABEL,
    showExtend: false,
    extendHours: 1
  },

  onLoad(query) {
    this.orderId = query.orderId;
    this.load();
  },

  async load() {
    const order = await fetchOrderDetail(this.orderId);
    this.setData({ order });
  },

  async onPay() {
    wx.showLoading({ title: '支付中', mask: true });
    try {
      await payBooking(this.orderId);
      wx.hideLoading();
      wx.showToast({ title: '支付成功' });
      this.load();
    } catch (e) {
      wx.hideLoading();
    }
  },

  async onCancel() {
    const ret = await wx.showModal({ title: '提示', content: '确定取消该订单？' });
    if (!ret.confirm) return;
    await cancelBooking(this.orderId);
    wx.showToast({ title: '已取消' });
    this.load();
  },

  onOpen() {
    wx.navigateTo({ url: `/pages/open-door/index?orderId=${this.orderId}` });
  },

  async onShowDoorCode() {
    try {
      const data = await fetchDoorCode(this.orderId);
      wx.showModal({
        title: '门锁验证码',
        content: `验证码：${data.code}\n有效期 5 分钟`,
        showCancel: false
      });
    } catch (e) {}
  },

  onShowExtend() { this.setData({ showExtend: true }); },
  onCloseExtend() { this.setData({ showExtend: false }); },
  onExtendChange(e) { this.setData({ extendHours: e.detail }); },
  async onExtendConfirm() {
    await extendBooking(this.orderId, this.data.extendHours);
    wx.showToast({ title: '续时成功' });
    this.setData({ showExtend: false });
    this.load();
  },

  onCallStore() {
    wx.makePhoneCall({ phoneNumber: '0755-88886666' });
  },
  onApplyInvoice() {
    wx.navigateTo({ url: `/pages/invoice/index?orderId=${this.orderId}` });
  }
});

import { fetchStoreDetail, fetchRoomAvailability } from '../../api/store';
import { createBooking, payBooking } from '../../api/booking';
import { fetchUsableCoupons } from '../../api/coupon';
import { isLoggedIn, requireLogin } from '../../utils/auth';
import { formatDate } from '../../utils/format';

function buildHourSlots() {
  const slots = [];
  for (let h = 10; h <= 23; h += 1) {
    slots.push(`${String(h).padStart(2, '0')}:00`);
  }
  return slots;
}

Page({
  data: {
    store: null,
    room: null,
    hourSlots: buildHourSlots(),
    occupied: [],
    showDatePopup: false,
    minDate: Date.now(),
    maxDate: Date.now() + 14 * 24 * 3600 * 1000,
    date: '',
    dateLabel: '',
    startTime: '',
    hours: 2,
    headcount: 2,
    remark: '',
    couponList: [],
    couponId: null,
    couponAmount: 0,
    showCouponPopup: false,
    submitting: false
  },

  computed_total() {
    if (!this.data.room) return 0;
    return this.data.room.hourPrice * this.data.hours;
  },

  async onLoad(query) {
    const today = new Date();
    const date = formatDate(today, 'YYYY-MM-DD');
    this.setData({
      date,
      dateLabel: date + ' ' + ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][today.getDay()],
      startTime: this.data.hourSlots[2]
    });

    const store = await fetchStoreDetail(query.storeId);
    const room = (store.rooms || []).find((r) => String(r.id) === String(query.roomId));
    this.setData({ store, room });
    this.refreshAvailability();
    this.refreshCoupons();
  },

  async refreshAvailability() {
    if (!this.data.room) return;
    const data = await fetchRoomAvailability({ roomId: this.data.room.id, date: this.data.date });
    this.setData({ occupied: data.occupied || [] });
  },

  async refreshCoupons() {
    const total = this.computed_total();
    const list = await fetchUsableCoupons(total);
    this.setData({ couponList: list });
  },

  onChangeDate() { this.setData({ showDatePopup: true }); },
  onConfirmDate(e) {
    const ts = e.detail;
    const d = new Date(ts);
    const date = formatDate(d, 'YYYY-MM-DD');
    this.setData({
      date,
      dateLabel: date + ' ' + ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][d.getDay()],
      showDatePopup: false
    });
    this.refreshAvailability();
  },
  onCancelDate() { this.setData({ showDatePopup: false }); },

  onPickStart(e) {
    this.setData({ startTime: e.currentTarget.dataset.time });
    this.refreshCoupons();
  },

  onChangeHours(e) {
    const hours = e.detail;
    this.setData({ hours });
    this.refreshCoupons();
  },

  onChangeHeadcount(e) {
    this.setData({ headcount: e.detail });
  },

  onRemarkInput(e) {
    this.setData({ remark: e.detail.value });
  },

  onPickCoupon() {
    if (this.data.couponList.length === 0) {
      wx.showToast({ title: '暂无可用优惠券', icon: 'none' });
      return;
    }
    this.setData({ showCouponPopup: true });
  },
  onCouponSelect(e) {
    const c = e.currentTarget.dataset.coupon;
    this.setData({
      couponId: c.id,
      couponAmount: c.amount,
      showCouponPopup: false
    });
  },
  onCouponClose() { this.setData({ showCouponPopup: false }); },
  onCouponClear() {
    this.setData({ couponId: null, couponAmount: 0, showCouponPopup: false });
  },

  computeEnd(start, hours) {
    const [h, m] = start.split(':').map(Number);
    const totalMinutes = h * 60 + m + hours * 60;
    return `${String(Math.floor(totalMinutes / 60) % 24).padStart(2, '0')}:${String(totalMinutes % 60).padStart(2, '0')}`;
  },

  async onSubmit() {
    if (!requireLogin()) return;
    if (this.data.submitting) return;
    this.setData({ submitting: true });
    try {
      const endTime = this.computeEnd(this.data.startTime, this.data.hours);
      const order = await createBooking({
        storeId: this.data.store.id,
        roomId: this.data.room.id,
        date: this.data.date,
        startTime: this.data.startTime,
        endTime,
        hours: this.data.hours,
        headcount: this.data.headcount,
        remark: this.data.remark,
        couponId: this.data.couponId,
        couponAmount: this.data.couponAmount
      });
      // 模拟微信支付
      wx.showLoading({ title: '支付中', mask: true });
      const paid = await payBooking(order.orderId);
      wx.hideLoading();
      wx.redirectTo({ url: `/pages/booking-success/index?orderId=${paid.orderId}` });
    } catch (e) {
      wx.hideLoading();
    } finally {
      this.setData({ submitting: false });
    }
  }
});

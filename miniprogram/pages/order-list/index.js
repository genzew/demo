import { fetchOrders } from '../../api/order';
import { cancelBooking } from '../../api/booking';

const TABS = [
  { name: '全部',   key: 'all' },
  { name: '进行中', key: 'ongoing' },
  { name: '已完成', key: 'finished' },
  { name: '已取消', key: 'cancelled' }
];

const STATUS_LABEL = {
  pending_pay: '待支付',
  paid: '已支付',
  in_use: '使用中',
  finished: '已完成',
  cancelled: '已取消'
};

Page({
  data: {
    tabs: TABS,
    activeTab: 0,
    list: [],
    loading: false,
    statusLabel: STATUS_LABEL
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ active: 2 });
    }
    this.load();
  },

  onPullDownRefresh() {
    this.load().finally(() => wx.stopPullDownRefresh());
  },

  async load() {
    this.setData({ loading: true });
    try {
      const status = TABS[this.data.activeTab].key;
      const { list } = await fetchOrders({ status });
      this.setData({ list, loading: false });
    } catch (e) {
      this.setData({ loading: false });
    }
  },

  onTabChange(e) {
    this.setData({ activeTab: e.detail.index });
    this.load();
  },

  goDetail(e) {
    const { id } = e.currentTarget.dataset;
    wx.navigateTo({ url: `/pages/order-detail/index?orderId=${id}` });
  },

  async onCancel(e) {
    const { id } = e.currentTarget.dataset;
    const ret = await wx.showModal({ title: '提示', content: '确定取消该订单？' });
    if (!ret.confirm) return;
    await cancelBooking(id);
    wx.showToast({ title: '已取消' });
    this.load();
  },

  onOpen(e) {
    const { id } = e.currentTarget.dataset;
    wx.navigateTo({ url: `/pages/open-door/index?orderId=${id}` });
  }
});

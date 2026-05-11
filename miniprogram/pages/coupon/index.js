import { fetchCoupons } from '../../api/coupon';

const TABS = [
  { name: '可使用', key: 'unused' },
  { name: '已使用', key: 'used' },
  { name: '已过期', key: 'expired' }
];

Page({
  data: {
    tabs: TABS,
    activeTab: 0,
    list: []
  },

  onLoad() { this.load(); },

  async load() {
    const list = await fetchCoupons({ status: TABS[this.data.activeTab].key });
    this.setData({ list });
  },

  onTabChange(e) {
    this.setData({ activeTab: e.detail.index });
    this.load();
  }
});

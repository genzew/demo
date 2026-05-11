import { fetchStores } from '../../api/store';

Page({
  data: {
    keyword: '',
    sort: 'distance',
    sortOptions: [
      { name: '距离最近', value: 'distance' },
      { name: '价格最低', value: 'price' },
      { name: '好评优先', value: 'rating' }
    ],
    list: [],
    loading: false
  },

  onLoad() {
    this.load();
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ active: 1 });
    }
  },

  onPullDownRefresh() {
    this.load().finally(() => wx.stopPullDownRefresh());
  },

  async load() {
    this.setData({ loading: true });
    try {
      const { list } = await fetchStores({ keyword: this.data.keyword, sort: this.data.sort });
      this.setData({ list, loading: false });
    } catch (e) {
      this.setData({ loading: false });
    }
  },

  onSearch(e) {
    this.setData({ keyword: e.detail });
    this.load();
  },

  onSortChange(e) {
    this.setData({ sort: e.currentTarget.dataset.value });
    this.load();
  },

  onStoreTap(e) {
    const { store } = e.detail;
    wx.navigateTo({ url: `/pages/store-detail/index?id=${store.id}` });
  }
});

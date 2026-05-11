import { fetchBanners, fetchActivities, fetchRecommendStores } from '../../api/home';
import { isLoggedIn } from '../../utils/auth';

Page({
  data: {
    banners: [],
    activities: [],
    stores: [],
    location: '深圳市',
    loading: true
  },

  onLoad() {
    this.loadAll();
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ active: 0 });
    }
  },

  onPullDownRefresh() {
    this.loadAll().finally(() => wx.stopPullDownRefresh());
  },

  async loadAll() {
    this.setData({ loading: true });
    try {
      const [banners, activities, stores] = await Promise.all([
        fetchBanners(),
        fetchActivities(),
        fetchRecommendStores()
      ]);
      this.setData({ banners, activities, stores, loading: false });
    } catch (e) {
      this.setData({ loading: false });
    }
  },

  goStoreList() {
    wx.switchTab({ url: '/pages/store-list/index' });
  },
  goScan() {
    if (!isLoggedIn()) {
      wx.navigateTo({ url: '/pages/login/index' });
      return;
    }
    wx.navigateTo({ url: '/pages/scan/index' });
  },
  goMyOrders() {
    wx.switchTab({ url: '/pages/order-list/index' });
  },
  goActivity() {
    wx.showToast({ title: '活动详情待实现', icon: 'none' });
  },
  onStoreTap(e) {
    const { store } = e.detail;
    wx.navigateTo({ url: `/pages/store-detail/index?id=${store.id}` });
  },
  onBannerTap(e) {
    const { link } = e.currentTarget.dataset;
    if (link) wx.navigateTo({ url: link, fail: () => wx.switchTab({ url: link }).catch(() => {}) });
  }
});

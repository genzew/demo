Page({
  data: { records: [] },

  onLoad() {
    this.setData({
      records: [
        { id: 1, type: '消费', amount: -6800, time: '2026-05-01 19:30', remark: '星空包厢·万象城店 A2 · 1小时' },
        { id: 2, type: '退款', amount:  4800, time: '2026-04-22 21:00', remark: '心动空间·华强北店 取消订单' },
        { id: 3, type: '消费', amount: -8800, time: '2026-04-15 20:00', remark: '夜星空·深圳湾店 VIP02 · 1小时' }
      ]
    });
  }
});

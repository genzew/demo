// 静态 mock 数据池

export const banners = [
  { id: 1, title: '春季大促 包厢8折起', image: 'https://img01.yzcdn.cn/vant/apple-1.jpg', link: '/pages/store-list/index' },
  { id: 2, title: '新店开业 满100减30',  image: 'https://img01.yzcdn.cn/vant/apple-2.jpg', link: '/pages/store-list/index' },
  { id: 3, title: '邀请好友 各得30元券', image: 'https://img01.yzcdn.cn/vant/apple-3.jpg', link: '/pages/invite/index' }
];

export const activities = [
  { id: 1, title: '周末嗨包间', desc: '周五至周日 全天8折', tag: 'HOT', cover: 'https://img01.yzcdn.cn/vant/cat.jpeg' },
  { id: 2, title: '深夜专享', desc: '22:00后6折特惠', tag: '新', cover: 'https://img01.yzcdn.cn/vant/leaf.jpg' },
  { id: 3, title: '连开3小时减30', desc: '订满3小时立减30元', tag: '限时', cover: 'https://img01.yzcdn.cn/vant/tree.jpg' }
];

export const stores = [
  {
    id: 1001, name: '星空包厢·万象城店', distance: 480, rating: 4.8, ratingCount: 1240,
    cover: 'https://img01.yzcdn.cn/vant/apple-1.jpg', minPrice: 6800,
    address: '深圳市南山区科技园万象城L4-08', phone: '0755-88886666',
    longitude: 113.953, latitude: 22.541,
    tags: ['空调', '免费wifi', '智能门锁'],
    business: '10:00 - 02:00',
    images: [
      'https://img01.yzcdn.cn/vant/apple-1.jpg',
      'https://img01.yzcdn.cn/vant/apple-2.jpg',
      'https://img01.yzcdn.cn/vant/apple-3.jpg'
    ],
    intro: '位于科技园核心商圈，独立空间隔音良好，提供智能门锁、投影、音响等设备。'
  },
  {
    id: 1002, name: '夜星空·深圳湾店', distance: 1230, rating: 4.6, ratingCount: 832,
    cover: 'https://img01.yzcdn.cn/vant/cat.jpeg', minPrice: 8800,
    address: '深圳市南山区深圳湾1号B座2楼', phone: '0755-88887777',
    longitude: 113.943, latitude: 22.530,
    tags: ['可订包夜', '高端', '投影'],
    business: '11:00 - 04:00',
    images: ['https://img01.yzcdn.cn/vant/cat.jpeg', 'https://img01.yzcdn.cn/vant/leaf.jpg'],
    intro: '靠海高端门店，落地玻璃景观，含8K投影与杜比音响。'
  },
  {
    id: 1003, name: '心动空间·华强北店', distance: 2900, rating: 4.5, ratingCount: 612,
    cover: 'https://img01.yzcdn.cn/vant/leaf.jpg', minPrice: 5800,
    address: '深圳市福田区华强北路1018号', phone: '0755-88888888',
    longitude: 114.092, latitude: 22.544,
    tags: ['性价比', '电竞房', '大屏'],
    business: '09:00 - 24:00',
    images: ['https://img01.yzcdn.cn/vant/leaf.jpg', 'https://img01.yzcdn.cn/vant/tree.jpg'],
    intro: '电竞主题，配备双屏 + 高刷显示器，团队聚会首选。'
  },
  {
    id: 1004, name: '星空包厢·龙华店', distance: 5400, rating: 4.4, ratingCount: 305,
    cover: 'https://img01.yzcdn.cn/vant/tree.jpg', minPrice: 4800,
    address: '深圳市龙华区民治大道', phone: '0755-88889999',
    longitude: 114.046, latitude: 22.665,
    tags: ['新店', '小包间', '安静'],
    business: '10:00 - 23:00',
    images: ['https://img01.yzcdn.cn/vant/tree.jpg'],
    intro: '新开业门店，主打小型私密包厢。'
  }
];

export const rooms = {
  1001: [
    { id: 11, storeId: 1001, name: 'A1·豪华大包', capacity: 12, hourPrice: 8800, image: 'https://img01.yzcdn.cn/vant/apple-1.jpg', status: 'idle' },
    { id: 12, storeId: 1001, name: 'A2·标准中包', capacity: 8,  hourPrice: 6800, image: 'https://img01.yzcdn.cn/vant/apple-2.jpg', status: 'idle' },
    { id: 13, storeId: 1001, name: 'A3·情侣小包', capacity: 4,  hourPrice: 5800, image: 'https://img01.yzcdn.cn/vant/apple-3.jpg', status: 'busy' }
  ],
  1002: [
    { id: 21, storeId: 1002, name: 'VIP01·总统套房', capacity: 16, hourPrice: 18800, image: 'https://img01.yzcdn.cn/vant/cat.jpeg', status: 'idle' },
    { id: 22, storeId: 1002, name: 'VIP02·豪华大包',  capacity: 10, hourPrice: 12800, image: 'https://img01.yzcdn.cn/vant/leaf.jpg', status: 'idle' }
  ],
  1003: [
    { id: 31, storeId: 1003, name: 'E1·电竞6人房', capacity: 6, hourPrice: 9800, image: 'https://img01.yzcdn.cn/vant/leaf.jpg', status: 'idle' },
    { id: 32, storeId: 1003, name: 'E2·电竞4人房', capacity: 4, hourPrice: 6800, image: 'https://img01.yzcdn.cn/vant/tree.jpg', status: 'idle' }
  ],
  1004: [
    { id: 41, storeId: 1004, name: 'B1·小包间', capacity: 4, hourPrice: 4800, image: 'https://img01.yzcdn.cn/vant/tree.jpg', status: 'idle' }
  ]
};

export const coupons = [
  { id: 'C001', title: '新人立减30元', desc: '订单满100元可用', amount: 3000, threshold: 10000, expireAt: '2026-12-31', status: 'unused' },
  { id: 'C002', title: '周末通用优惠券', desc: '周五至周日全天可用', amount: 1500, threshold: 5000, expireAt: '2026-08-31', status: 'unused' },
  { id: 'C003', title: '会员专享50元券', desc: '老用户专属', amount: 5000, threshold: 20000, expireAt: '2026-06-30', status: 'used' }
];

export const defaultUser = {
  userId: 9001,
  nickname: '匿名小猫',
  avatar: 'https://img01.yzcdn.cn/vant/cat.jpeg',
  phone: '13800138000',
  vipLevel: 1,
  bookingCount: 12,
  couponCount: 2
};

let _orderSeq = 1000;
export function nextOrderId() {
  _orderSeq += 1;
  return `BO${Date.now().toString().slice(-6)}${_orderSeq}`;
}

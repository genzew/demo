import * as M from './data';

const ORDER_KEY = 'mock_orders';

function loadOrders() {
  try {
    return wx.getStorageSync(ORDER_KEY) || [];
  } catch (e) {
    return [];
  }
}

function saveOrders(orders) {
  wx.setStorageSync(ORDER_KEY, orders);
}

function findStore(id) {
  return M.stores.find((s) => String(s.id) === String(id));
}

function findRoom(storeId, roomId) {
  const list = M.rooms[storeId] || [];
  return list.find((r) => String(r.id) === String(roomId));
}

const handlers = {
  // ============= 首页 =============
  'GET /home/banners': () => M.banners,
  'GET /home/activities': () => M.activities,
  'GET /home/recommend-stores': () => M.stores.slice(0, 3),

  // ============= 门店 =============
  'GET /stores': (data) => {
    let list = [...M.stores];
    if (data.keyword) {
      list = list.filter((s) => s.name.includes(data.keyword) || s.address.includes(data.keyword));
    }
    if (data.sort === 'distance') list.sort((a, b) => a.distance - b.distance);
    else if (data.sort === 'price') list.sort((a, b) => a.minPrice - b.minPrice);
    else if (data.sort === 'rating') list.sort((a, b) => b.rating - a.rating);
    return { list, total: list.length };
  },
  'GET /stores/:id': (data) => {
    const store = findStore(data.id);
    if (!store) throw new Error('门店不存在');
    return { ...store, rooms: M.rooms[store.id] || [] };
  },

  // ============= 包厢 =============
  'GET /rooms/availability': (data) => {
    // 假装根据日期返回该房间被占用的时段
    return {
      roomId: data.roomId,
      date: data.date,
      occupied: [
        { start: '14:00', end: '16:00' },
        { start: '20:00', end: '22:00' }
      ]
    };
  },

  // ============= 预订/订单 =============
  'POST /bookings': (data) => {
    const store = findStore(data.storeId);
    const room = findRoom(data.storeId, data.roomId);
    if (!store || !room) throw new Error('门店或包厢不存在');
    const total = room.hourPrice * (data.hours || 1);
    const order = {
      orderId: M.nextOrderId(),
      storeId: store.id,
      storeName: store.name,
      storeAddress: store.address,
      roomId: room.id,
      roomName: room.name,
      roomCover: room.image,
      hourPrice: room.hourPrice,
      hours: data.hours,
      date: data.date,
      startTime: data.startTime,
      endTime: data.endTime,
      headcount: data.headcount || 2,
      remark: data.remark || '',
      totalAmount: total,
      payAmount: total - (data.couponAmount || 0),
      couponId: data.couponId || null,
      couponAmount: data.couponAmount || 0,
      status: 'pending_pay',
      doorCode: '',
      createTime: Date.now()
    };
    const orders = loadOrders();
    orders.unshift(order);
    saveOrders(orders);
    return order;
  },
  'POST /bookings/:orderId/pay': (data) => {
    const orders = loadOrders();
    const o = orders.find((x) => x.orderId === data.orderId);
    if (!o) throw new Error('订单不存在');
    o.status = 'paid';
    o.doorCode = String(Math.floor(100000 + Math.random() * 900000));
    o.payTime = Date.now();
    saveOrders(orders);
    return o;
  },
  'POST /bookings/:orderId/cancel': (data) => {
    const orders = loadOrders();
    const o = orders.find((x) => x.orderId === data.orderId);
    if (!o) throw new Error('订单不存在');
    if (!['pending_pay', 'paid'].includes(o.status)) throw new Error('当前状态不允许取消');
    o.status = 'cancelled';
    saveOrders(orders);
    return o;
  },
  'POST /bookings/:orderId/extend': (data) => {
    const orders = loadOrders();
    const o = orders.find((x) => x.orderId === data.orderId);
    if (!o) throw new Error('订单不存在');
    o.hours += data.extendHours;
    o.totalAmount += o.hourPrice * data.extendHours;
    o.payAmount += o.hourPrice * data.extendHours;
    saveOrders(orders);
    return o;
  },

  'GET /orders': (data) => {
    const orders = loadOrders();
    if (data.status && data.status !== 'all') {
      return { list: orders.filter((o) => mapStatus(o.status, data.status)), total: orders.length };
    }
    return { list: orders, total: orders.length };
  },
  'GET /orders/:orderId': (data) => {
    const o = loadOrders().find((x) => x.orderId === data.orderId);
    if (!o) throw new Error('订单不存在');
    return o;
  },

  // ============= 开门 =============
  'POST /devices/open': (data) => {
    if (!data.orderId && !data.qrcode) throw new Error('参数缺失');
    return { success: true, openAt: Date.now() };
  },
  'GET /devices/door-code': (data) => {
    const o = loadOrders().find((x) => x.orderId === data.orderId);
    if (!o) throw new Error('订单不存在');
    if (o.status !== 'paid' && o.status !== 'in_use') throw new Error('订单状态不可用');
    return { code: o.doorCode, expireAt: Date.now() + 5 * 60 * 1000 };
  },

  // ============= 用户 =============
  'POST /user/wx-login': () => ({
    token: 'mock-token-' + Date.now(),
    user: M.defaultUser
  }),
  'GET /user/profile': () => M.defaultUser,
  'PUT /user/profile': (data) => ({ ...M.defaultUser, ...data }),

  // ============= 优惠券 =============
  'GET /coupons': (data) => {
    if (!data.status || data.status === 'all') return M.coupons;
    return M.coupons.filter((c) => c.status === data.status);
  },
  'GET /coupons/usable': (data) => M.coupons.filter((c) => c.status === 'unused' && c.threshold <= (data.amount || 0)),

  // ============= 反馈/发票/邀请 =============
  'POST /feedback': () => ({ ok: true }),
  'POST /invoice': () => ({ ok: true, applyId: 'IV' + Date.now() }),
  'GET /invite/info': () => ({
    inviteCode: 'WX' + (M.defaultUser.userId).toString(36).toUpperCase(),
    invitedCount: 3,
    rewardAmount: 9000
  })
};

function mapStatus(orderStatus, queryStatus) {
  // 把内部状态映射成 UI 的三个分组
  if (queryStatus === 'ongoing') return ['pending_pay', 'paid', 'in_use'].includes(orderStatus);
  if (queryStatus === 'finished') return orderStatus === 'finished';
  if (queryStatus === 'cancelled') return orderStatus === 'cancelled';
  return true;
}

// 路由匹配：支持 /stores/:id 形式
function matchRoute(method, url) {
  for (const key of Object.keys(handlers)) {
    const [m, pattern] = key.split(' ');
    if (m !== method) continue;
    const patternParts = pattern.split('/').filter(Boolean);
    const urlParts = url.split('?')[0].split('/').filter(Boolean);
    if (patternParts.length !== urlParts.length) continue;
    const params = {};
    let matched = true;
    for (let i = 0; i < patternParts.length; i += 1) {
      if (patternParts[i].startsWith(':')) {
        params[patternParts[i].slice(1)] = decodeURIComponent(urlParts[i]);
      } else if (patternParts[i] !== urlParts[i]) {
        matched = false;
        break;
      }
    }
    if (matched) return { handler: handlers[key], params };
  }
  return null;
}

export default function mockHandler(url, method, data) {
  const matched = matchRoute(method, url);
  if (!matched) {
    throw new Error(`mock 未实现的接口: ${method} ${url}`);
  }
  return matched.handler({ ...data, ...matched.params });
}

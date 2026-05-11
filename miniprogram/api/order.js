import http from '../utils/request';

export const fetchOrders = (params = {}) => http.get('/orders', params);
export const fetchOrderDetail = (orderId) => http.get(`/orders/${orderId}`);

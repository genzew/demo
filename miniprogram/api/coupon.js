import http from '../utils/request';

export const fetchCoupons = (params = {}) => http.get('/coupons', params);
export const fetchUsableCoupons = (amount) => http.get('/coupons/usable', { amount });

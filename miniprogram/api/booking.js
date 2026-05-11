import http from '../utils/request';

export const createBooking = (data) => http.post('/bookings', data);
export const payBooking = (orderId) => http.post(`/bookings/${orderId}/pay`, { orderId });
export const cancelBooking = (orderId) => http.post(`/bookings/${orderId}/cancel`, { orderId });
export const extendBooking = (orderId, extendHours) =>
  http.post(`/bookings/${orderId}/extend`, { orderId, extendHours });

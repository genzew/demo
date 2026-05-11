import http from '../utils/request';

export const openDoor = (data) => http.post('/devices/open', data);
export const fetchDoorCode = (orderId) => http.get('/devices/door-code', { orderId });

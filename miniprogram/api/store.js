import http from '../utils/request';

export const fetchStores = (params = {}) => http.get('/stores', params);
export const fetchStoreDetail = (id) => http.get(`/stores/${id}`);
export const fetchRoomAvailability = (params) => http.get('/rooms/availability', params);

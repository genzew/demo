import http from '../utils/request';

export const wxLogin = (data) => http.post('/user/wx-login', data);
export const fetchProfile = () => http.get('/user/profile');
export const updateProfile = (data) => http.put('/user/profile', data);

import http from '../utils/request';

export const fetchBanners = () => http.get('/home/banners');
export const fetchActivities = () => http.get('/home/activities');
export const fetchRecommendStores = () => http.get('/home/recommend-stores');

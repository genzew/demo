import http from '../utils/request';

export const submitFeedback = (data) => http.post('/feedback', data);
export const applyInvoice = (data) => http.post('/invoice', data);
export const fetchInviteInfo = () => http.get('/invite/info');

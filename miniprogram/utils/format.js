export function pad(n) {
  return n < 10 ? `0${n}` : `${n}`;
}

export function formatDate(ts, fmt = 'YYYY-MM-DD HH:mm') {
  const d = ts instanceof Date ? ts : new Date(ts);
  return fmt
    .replace('YYYY', d.getFullYear())
    .replace('MM', pad(d.getMonth() + 1))
    .replace('DD', pad(d.getDate()))
    .replace('HH', pad(d.getHours()))
    .replace('mm', pad(d.getMinutes()))
    .replace('ss', pad(d.getSeconds()));
}

export function formatPrice(cents) {
  if (cents == null) return '0.00';
  return (cents / 100).toFixed(2);
}

export function formatDistance(meters) {
  if (meters == null) return '';
  if (meters < 1000) return `${Math.round(meters)}m`;
  return `${(meters / 1000).toFixed(1)}km`;
}

export function formatDuration(minutes) {
  if (!minutes) return '0分钟';
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h && m) return `${h}小时${m}分钟`;
  if (h) return `${h}小时`;
  return `${m}分钟`;
}

export function maskPhone(phone) {
  if (!phone || phone.length < 7) return phone || '';
  return `${phone.slice(0, 3)}****${phone.slice(-4)}`;
}

const TOKEN_KEY = 'token';
const USER_KEY = 'userInfo';

export function getStorageToken() {
  try {
    return wx.getStorageSync(TOKEN_KEY) || '';
  } catch (e) {
    return '';
  }
}

export function setStorageToken(token) {
  wx.setStorageSync(TOKEN_KEY, token);
}

export function clearStorageToken() {
  wx.removeStorageSync(TOKEN_KEY);
  wx.removeStorageSync(USER_KEY);
}

export function getUserInfo() {
  try {
    return wx.getStorageSync(USER_KEY) || null;
  } catch (e) {
    return null;
  }
}

export function setUserInfo(user) {
  wx.setStorageSync(USER_KEY, user);
}

export function isLoggedIn() {
  return !!getStorageToken();
}

export function requireLogin() {
  if (!isLoggedIn()) {
    wx.navigateTo({ url: '/pages/login/index' });
    return false;
  }
  return true;
}

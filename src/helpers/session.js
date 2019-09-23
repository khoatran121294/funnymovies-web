// Define local storage
const ACCESS_TOKEN = "access_token";
const USER_INFO = "user_info";

export default {
  // For access token
  setAccessToken(token) {
    localStorage.setItem(ACCESS_TOKEN, token);
  },
  getAccessToken() {
    return localStorage.getItem(ACCESS_TOKEN);
  },
  removeAccessToken() {
    localStorage.removeItem(ACCESS_TOKEN);
  },

  // For user info
  setUserInfo(userInfo) {
    localStorage.setItem(USER_INFO, userInfo);
  },
  getUserInfo() {
    return localStorage.getItem(USER_INFO);
  },
  removeUserInfo() {
    localStorage.removeItem(USER_INFO);
  },

  clearAll() {
    localStorage.clear();
  }
};

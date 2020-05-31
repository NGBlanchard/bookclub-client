import config from "../config";

const TokenService = {
  setUser(user) {
    window.sessionStorage.setItem(config.USER, JSON.stringify(user));
  },
  getUser() {
    return window.sessionStorage.getItem(config.USER);
  },
  getAuthToken() {
    return window.localStorage.getItem(config.TOKEN_KEY);
  },
  saveAuthToken(token) {
    window.localStorage.setItem(config.TOKEN_KEY, token);
  },
  clearAuthToken() {
    window.localStorage.removeItem(config.TOKEN_KEY);
  },
  hasAuthToken() {
    return !!TokenService.getAuthToken();
  },
  makeBasicAuthToken(userName, password) {
    return window.btoa(`${userName}:${password}`);
  }
}

export default TokenService;
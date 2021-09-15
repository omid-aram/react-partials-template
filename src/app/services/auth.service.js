
import baseService from './base.service'

export const LOGIN_URL = "";
export const ME_URL = "";
export const REGISTER_URL = "";
export const REQUEST_PASSWORD_URL = "";

export function login(loginModel) {
  return baseService.post("/Auth/Login", loginModel);
}

export function register(email, fullname, username, password) {
  return baseService.post("/Auth/Login", {});
}

export function requestPassword(email) {
  return baseService.post("/Auth/Login", {});
}

export function getUserByToken() {
  // Authorization head should be fulfilled in interceptor.
  return baseService.post("/Auth/Login", {});
}



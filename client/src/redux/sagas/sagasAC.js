import {
  AUTH_REQUESTED,
  REGISTER_REQUESTED,
  UNAUTH_REQUESTED,
  CHECK_AUTH_REQUESTED,
} from '../actionTypes/userTypes';

export function loginAC(payload) {
  return {
    type: AUTH_REQUESTED,
    payload,
  };
}

export function registerAC(payload) {
  return {
    type: REGISTER_REQUESTED,
    payload,
  };
}

export function unauthAC(payload) {
  return {
    type: UNAUTH_REQUESTED,
    payload,
  };
}

export function checkAuthAC() {
  return {
    type: CHECK_AUTH_REQUESTED,
  };
}

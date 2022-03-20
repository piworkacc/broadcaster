import {
  AUTH_REQUESTED,
  REGISTER_REQUESTED,
  UNAUTH_REQUESTED,
} from '../actionTypes/userTypes';
import { GET_USER_VIDEOS } from '../actionTypes/videoTypes';

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

export function getUserVideosAC(payload) {
  return {
    type: GET_USER_VIDEOS,
    payload,
  };
}

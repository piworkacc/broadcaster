import { GET_LATEST_KEY, GET_NEW_KEY } from '../actionTypes/keyTypes'

export const newKey = (payload) => {
  return {
    type: GET_NEW_KEY,
    payload: payload.key,
  };
};

export const latestKey = (payload) => {
  return {
    type: GET_LATEST_KEY,
    payload: payload.stream_key,
  };
};

import { GET_NEW_KEY } from '../actionTypes/keyTypes'

export const newKey = (payload) => {
  return {
    type: GET_NEW_KEY,
    payload,
  };
};

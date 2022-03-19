import { ADD_USER, AUTH, UNAUTH } from "../actionTypes/userTypes";

export const setAuth = (payload) => {
  return {
    type: AUTH,
    payload,
  };
};

export const removeAuth = () => {
  return {
    type: UNAUTH,
  };
};

export const addUser = (payload) => {
  return {
    type: ADD_USER,
    payload,
  };
};

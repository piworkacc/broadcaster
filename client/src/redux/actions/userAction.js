import { ADD_USER, AUTH, UNAUTH } from "../actionTypes/userTypes";

export const setAuth = (name) => {
  return {
    type: AUTH,
    payload: name,
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

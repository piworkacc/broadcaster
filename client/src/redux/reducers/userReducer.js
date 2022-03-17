import { AUTH, UNAUTH } from "../actionTypes/userTypes";

const cache = window.localStorage.getItem('state');
const preloadedState = cache ? JSON.parse(cache).auth : { ok: false };

const authReducer = (state = preloadedState, action) => {
  const { type, payload } = action;
  switch (type) {
    case AUTH:
      return { name: payload, ok: true };
    case UNAUTH:
      return { ok: false };
    default:
      return state;
  }
};

export default authReducer;

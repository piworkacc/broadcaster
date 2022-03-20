import { GET_NEW_KEY } from '../actionTypes/keyTypes'


const cache = window.localStorage.getItem('state');
const preloadedState = JSON.parse(cache).streams;

const keyReducer = (state = preloadedState || [], action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_NEW_KEY:
      return payload;
    default:
      return state;
  }
};

export default keyReducer;

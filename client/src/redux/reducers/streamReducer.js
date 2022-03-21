import { GET_ALL_STREAMS, NEW_STREAM } from '../actionTypes/streamTypes';

const cache = window.localStorage.getItem('state');
const preloadedState = cache ? JSON.parse(cache).streams : [];

const streamReducer = (state = preloadedState || [], action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_ALL_STREAMS:
      return payload;
    case NEW_STREAM:
      return [payload, ...state];
    default:
      return state;
  }
};

export default streamReducer;

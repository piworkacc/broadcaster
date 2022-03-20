import { GET_ALL_STREAMS } from "../actionTypes/streamTypes";


const cache = window.localStorage.getItem('state');
const preloadedState = JSON.parse(cache).streams;

const streamReducer = (state = preloadedState || [], action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_ALL_STREAMS:
      return payload;
    default:
      return state;
  }
};

export default streamReducer;

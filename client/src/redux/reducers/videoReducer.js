import { GET_TAG_VIDEOS } from "../actionTypes/videoTypes.js";

const cache = window.localStorage.getItem('state');
const preloadedState = JSON.parse(cache).videos;

const streamReducer = (state = preloadedState || [], action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_TAG_VIDEOS:
      return payload;
    default:
      return state;
  }
};

export default streamReducer;

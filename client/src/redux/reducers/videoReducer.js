import { GET_TAG_VIDEOS, LIKE_VIDEO } from '../actionTypes/videoTypes.js';

const cache = window.localStorage.getItem('state');
const preloadedState = cache ? JSON.parse(cache).videos : [];

const streamReducer = (state = preloadedState || [], action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_TAG_VIDEOS:
      return payload;
    case LIKE_VIDEO:
      return state.map((el) =>
        payload.streamId === el.id
          ? { ...el, likesCount: payload.likesCount }
          : el,
      );

    default:
      return state;
  }
};

export default streamReducer;

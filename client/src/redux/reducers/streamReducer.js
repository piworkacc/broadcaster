import {
  GET_ALL_STREAMS,
  NEW_STREAM,
  LIKE_STREAM,
} from '../actionTypes/streamTypes';

const cache = window.localStorage.getItem('state');
const preloadedState = cache ? JSON.parse(cache).streams : [];

const streamReducer = (state = preloadedState || [], action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_ALL_STREAMS:
      return payload;
    case NEW_STREAM:
      if (NEW_STREAM.broadcast_id) {
        return [payload, ...state];
      }
      return state;
    case LIKE_STREAM:
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

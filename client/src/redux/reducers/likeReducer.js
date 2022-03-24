import { STREAM_LIKES } from '../actionTypes/likeTypes';

const likeReducer = (state = { likesCount: 0 }, { type, payload }) => {
  switch (type) {
    case STREAM_LIKES:
      return { ...payload };
    default:
      return state;
  }
};

export default likeReducer;

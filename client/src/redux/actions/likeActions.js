import { STREAM_LIKES } from '../actionTypes/likeTypes';

export const streamLikes = (payload) => {
  return {
    type: STREAM_LIKES,
    payload,
  };
};

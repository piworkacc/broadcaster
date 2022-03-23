import {
  GET_ALL_STREAMS,
  NEW_STREAM,
  LIKE_STREAM,
} from '../actionTypes/streamTypes';

export const allStreams = (payload) => {
  return {
    type: GET_ALL_STREAMS,
    payload,
  };
};

export const newStream = (payload) => {
  return {
    type: NEW_STREAM,
    payload,
  };
};

export const likeStream = (payload) => {
  return {
    type: LIKE_STREAM,
    payload,
  };
};

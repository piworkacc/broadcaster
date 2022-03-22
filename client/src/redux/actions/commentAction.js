import { ADD_NEW_COMMENT, GET_ALL_COMMENTS } from "../actionTypes/commentTypes";

export const allComments = (payload) => {
  return {
    type: GET_ALL_COMMENTS,
    payload
  };
};

export const newComment = (payload) => {
  return {
    type: ADD_NEW_COMMENT,
    payload
  };
};

import { GET_ALL_COMMENTS } from "../actionTypes/commentsTypes";

export const allComments = (payload) => {
  return {
    type: GET_ALL_COMMENTS,
    payload
  };
};


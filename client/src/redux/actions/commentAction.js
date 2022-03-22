import { GET_ALL_COMMENTS } from "../actionTypes/commentTypes";

export const allComments = (payload) => {
  return {
    type: GET_ALL_COMMENTS,
    payload
  };
};


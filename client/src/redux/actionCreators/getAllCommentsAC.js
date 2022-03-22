import { allComments } from "../actions/commentAction";

export const getAllCommentsAC = (data) => {
  return async (dispatch) => {
    try {
      const { service, stream_id } = data;
      const comments = await service.uxios(`/api/comments/${stream_id}`);
      dispatch(allComments(comments));
    } catch (err) {
      throw (new Error(err))
    }
  };
};

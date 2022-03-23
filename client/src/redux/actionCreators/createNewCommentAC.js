import { newComment } from '../actions/commentAction';

export const createNewCommentAC = (data) => {
  return async (dispatch) => {
    try {
      const { user_id, service, stream_id, comment } = data;
      const body = {
        user_id,
        stream_id,
        comment,
      };

      const addedComment = await service.uxios('/api/comments/', 'POST', body);
      if (addedComment) {
        dispatch(newComment(addedComment));
      }
    } catch (err) {
      throw new Error(err);
    }
  };
};

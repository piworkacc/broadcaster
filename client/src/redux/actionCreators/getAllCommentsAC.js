import { allComments } from "../actions/commentAction";

export const getAllCommentsAC = (service, videoId) => {
	return  async (dispatch) => {
		try {
			const comments = await service.uxios(`./api/comments/:${videoId}`);
      dispatch(allComments(comments));
		} catch(err) {
			throw (new Error(err))
		}
	};
};

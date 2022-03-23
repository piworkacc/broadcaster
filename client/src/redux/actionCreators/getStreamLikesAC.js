import { getLikes } from "../actions/likeAction";


export const getStreamLikesAC = ({stream_id}) => {
	return async (dispatch) => {
		try {
			const response = await fetch(`/api/likes/${stream_id}` )
			const likes = await response.json();
			dispatch(getLikes(likes));
		} catch (err) {
			throw new Error(err);
		}
	};
};

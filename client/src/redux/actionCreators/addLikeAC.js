import { addLike } from "../actions/likeAction";


export const addLikeAC = ({user_id, stream_id}) => {
	return async (dispatch) => {
		try {
			const response = await fetch('/api/likes/newlike', {
				method: 'POST',
				headers: {
					'content-type':'application/json',
				},
				body:JSON.stringify({user_id, stream_id})
			})
			const postLike = await response.json();
			dispatch(addLike(postLike));
		} catch (err) {
			throw new Error(err);
		}
	};
};

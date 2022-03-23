import {ADD_LIKE, GET_STREAM_LIKES } from '../actionTypes/likeTypes'

// const cache = window.localStorage.getItem('state');
// const preloadedState = cache ? JSON.parse(cache)?.likes : [];

const likeReducer = (state = [], action) => {
	const { type, payload } = action;
	switch (type) {
		case ADD_LIKE:
			console.log(state)
			if(payload.isLiked === true ) {
			return  [...state, payload]
			} else {
				return [...state, state.filter(el => el.id !== payload.id)]
			}
		case GET_STREAM_LIKES:
			return payload;
		default:
			return state;
	}
};

export default likeReducer;

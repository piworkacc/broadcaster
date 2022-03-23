import {ADD_LIKE, GET_STREAM_LIKES } from "../actionTypes/likeTypes";

export const addLike = (payload) => {
	return {
		type: ADD_LIKE,
		payload: payload,
	};
};

export const getLikes = (payload) => {
	return {
		type: GET_STREAM_LIKES,
		payload,
	}
}

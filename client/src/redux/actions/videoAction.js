import {ADD_VIDEO} from "../actionTypes/videoTypes";

export const addVideo = (payload) => {
	return {
		type: ADD_VIDEO,
		payload,
	};
};

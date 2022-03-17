import {ADD_VIDEO} from "../actionTypes/videoTypes";

const videoReducer = (state = [], action) => {
	const { type, payload } = action;
	switch (type) {
		case ADD_VIDEO:
			return payload;
		default:
			return state;
	}
};

export default videoReducer;

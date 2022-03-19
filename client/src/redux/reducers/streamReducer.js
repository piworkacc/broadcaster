import {GET_ALL_STREAMS} from "../actionTypes/streamTypes";

const streamReducer = (state = [], action) => {
	const { type, payload } = action;
	switch (type) {
		case GET_ALL_STREAMS:
			return payload;
		default:
			return state;
	}
};

export default streamReducer;

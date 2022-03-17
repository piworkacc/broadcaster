import {ADD_USER} from "../actionTypes/userTypes";

const parrotReducer = (state = [], action) => {
	const { type, payload } = action;
	switch (type) {
		case ADD_USER:
			return payload;
		default:
			return state;
	}
};

export default parrotReducer;

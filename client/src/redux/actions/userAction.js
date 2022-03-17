import {ADD_USER} from "../actionTypes/userTypes";

export const addUser = (payload) => {
	return {
		type: ADD_USER,
		payload,
	};
};

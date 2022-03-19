import {GET_ALL_STREAMS} from '../actionTypes/streamTypes'


export const allStreams = (payload) => {
	return {
		type: GET_ALL_STREAMS,
		payload,
	};
};

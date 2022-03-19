import { allStreams } from "../actions/streamAction";
import {streamPath} from "../../utils/fetchPath";

export const getAllStreamsAC = () => {
	return  async (dispatch) => {
		try {
			const response = await fetch(streamPath)
			const streams = await response.json();
			dispatch(allStreams(streams))
		} catch(err) {
			throw (new Error(err))
		}
	};
};

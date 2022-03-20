import {GET_TAG_VIDEOS} from "../actionTypes/videoTypes";

export const getAllVideos = (payload) => {
	return {
		type: GET_TAG_VIDEOS,
		payload,
	}
}

import {GET_TAG_VIDEOS, GET_USER_VIDEOS} from "../actionTypes/videoTypes";

export const getAllVideos = (payload) => {
	return {
		type: GET_TAG_VIDEOS,
		payload,
	}
}

export const getUserVideos = (payload) => {
  return {
    type: GET_USER_VIDEOS,
    payload
  }
}

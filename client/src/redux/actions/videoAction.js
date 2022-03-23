import { GET_TAG_VIDEOS, LIKE_VIDEO } from "../actionTypes/videoTypes";

export const getAllVideos = (payload) => {
  return {
    type: GET_TAG_VIDEOS,
    payload,
  }
}

export const likeVideo = (payload) => {
  return {
    type: LIKE_VIDEO,
    payload,
  }
}

import { streamLikes } from '../actions/likeActions';

export const getStreamLikesAC = ({ streamId, service }) => {
  return async (dispatch) => {
    const likes = await service.uxios(`/api/likes/${streamId}`);
    if (likes) {
      dispatch(streamLikes(likes));
    }
  };
};

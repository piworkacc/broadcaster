import { getAllVideos } from '../actions/videoAction';
import { streamPath } from '../../utils/fetchPath';
import { selectionSize } from '../../utils/constants';

export const getAllVideosAC = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${streamPath}/selection/${selectionSize}`);
      const videos = await response.json();
      dispatch(getAllVideos(videos));
    } catch (err) {
      throw new Error(err);
    }
  };
};

import { streamLikes } from '../actions/likeActions';
import { likeStream } from '../actions/streamAction';
import { likeVideo } from '../actions/videoAction';

const likeStreamAC = ({ streamId, service }) => {
  return async (dispatch) => {
    const data = await service.uxios('/api/likes/', 'POST', { streamId });
    if (data) {
      data.streamId = streamId;
      dispatch(likeStream(data));
      dispatch(likeVideo(data));
      dispatch(streamLikes(data));
    }
  };
};

export default likeStreamAC;

import { latestKey } from '../actions/keyAction';
import { newStream } from '../actions/streamAction';

export const createNewStreamAC = (data) => {
  return async (dispatch) => {
    try {
      const { user_id, service, title, preview, tags } = data;
      const newKey = await service.uxios('/api/keys/new');
      const body = {
        user_id: user_id,
        stream_key: newKey.key,
        title: title,
        preview: preview,
        tags: tags,
      };

      const stream = await service.uxios('/api/streams', 'POST', body);
      dispatch(newStream(stream));
      dispatch(latestKey(stream));
    } catch (err) {
      throw new Error(err);
    }
  };
};

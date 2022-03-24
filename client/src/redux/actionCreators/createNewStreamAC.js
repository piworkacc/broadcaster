import { latestKey } from '../actions/keyAction';
import { newStream } from '../actions/streamAction';

export const createNewStreamAC = (data) => {
  return async (dispatch) => {
    try {
      const { user_id, service, title, preview, file, tags } = data;
      const newKey = await service.uxios('/api/keys/new');
      const body = {
        user_id: user_id,
        stream_key: newKey.key,
        title: title,
        preview: preview,
        tags: tags,
      };

      const fd = new FormData();
      fd.append('file', file.originFileObj);
      fd.append('data', JSON.stringify(body));

      try {
        const res = await fetch('/api/streams', {
          method: 'POST',
          body: fd,
        });
        if (res.ok) {
          const stream = await res.json();
          dispatch(newStream(stream));
          dispatch(latestKey(stream));
        }
      } catch (error) {
        console.error(error);
      }

      // const stream = await service.uxios('/api/streams', 'POST', body);
    } catch (err) {
      throw new Error(err);
    }
  };
};

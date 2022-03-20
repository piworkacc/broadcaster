import { newStream } from "../actions/streamAction";

export const createNewStreamAC = (data) => {
  const { user_id, stream_key, title, preview } = data;
  return async (dispatch) => {
    try {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          user_id: user_id, 
          stream_key: stream_key, 
          title: title, 
          preview: preview, 
        })
      };

      const response = await fetch('/api/streams', requestOptions);
      const stream = await response.json();
      dispatch(newStream(stream))
    } catch (err) {
      throw (new Error(err))
    }
  };
};

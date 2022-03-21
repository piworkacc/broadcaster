import { latestKey } from '../actions/keyAction';

export const getLatestKeyAC = (service) => {
  return async (dispatch) => {
    try {
      const key = await service.uxios('./api/keys/latest');
      if (key) {
        dispatch(latestKey(key));
      } else {
        dispatch(latestKey({ stream_key: '' }));
      }
    } catch (err) {
      throw new Error(err);
    }
  };
};

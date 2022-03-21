import { latestKey } from "../actions/keyAction";

export const getLatestKeyAC = () => {
	return  async (dispatch) => {
		try {
      const response = await fetch('./api/keys/latest')
			const key = await response.json();
			dispatch(latestKey(key))
		} catch(err) {
			throw (new Error(err))
		}
	};
};

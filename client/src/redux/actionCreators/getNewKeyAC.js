import { newKey } from "../actions/keyAction";

export const getNewKeyAC = () => {
	return  async (dispatch) => {
		try {
      const response = await fetch('./api/keys/new')
			const key = await response.json();
			dispatch(newKey(key.key))
		} catch(err) {
			throw (new Error(err))
		}
	};
};

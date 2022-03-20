const { allTags } = require("../actions/tagAction");

export const getAllTagsAC = () => {
	return  async (dispatch) => {
		try {
      const response = await fetch('./api/tags')
			const tags = await response.json();
			dispatch(allTags(tags))
		} catch(err) {
			throw (new Error(err))
		}
	};
};


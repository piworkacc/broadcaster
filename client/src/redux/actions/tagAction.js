const { GET_ALL_TAGS } = require("../actionTypes/tagsTypes");

export const allTags = (payload) => {
  return {
    type: GET_ALL_TAGS,
    payload,
  };
};


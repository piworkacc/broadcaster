import { GET_ALL_TAGS } from "../actionTypes/tagsTypes";

const cache = window.localStorage.getItem('state');
const preloadedState = JSON.parse(cache).tags;

export default function tagReducer(state = preloadedState || [], { type, payload }) {
  switch (type) {

  case GET_ALL_TAGS:
    return payload;

  default:
    return state;
  }
}


import { combineReducers } from 'redux';
import authReducer from './userReducer';
import videoReducer from './videoReducer';
import streamReducer from './streamReducer';
import tagReducer from './tagReducer';
import keyReducer from './keyReduser';
import commentReducer from './commentReducer';
import likeReducer from './likeReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  videos: videoReducer,
  streams: streamReducer,
  tags: tagReducer,
  keys: keyReducer,
  comments: commentReducer,
  likes: likeReducer,
});

export default rootReducer;

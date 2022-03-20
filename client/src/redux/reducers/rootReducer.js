import { combineReducers } from 'redux';
import authReducer from './userReducer';
import videoReducer from "./videoReducer";
import streamReducer from "./streamReducer";
import tagReducer from './tagReducer';


const rootReducer = combineReducers({ auth: authReducer, videos: videoReducer, streams: streamReducer, tags: tagReducer });

export default rootReducer;


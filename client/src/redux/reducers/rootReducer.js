import { combineReducers } from 'redux';
import authReducer from './userReducer';
import videoReducer from "./videoReducer";
import streamReducer from "./streamReducer";


const rootReducer = combineReducers({ auth: authReducer, videos: videoReducer, streams: streamReducer });

export default rootReducer;


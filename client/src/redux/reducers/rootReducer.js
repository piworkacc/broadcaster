import { combineReducers } from 'redux';
import authReducer from './userReducer';
import videoReducer from "./videoReducer";


const rootReducer = combineReducers({ auth: authReducer, video: videoReducer });

export default rootReducer;

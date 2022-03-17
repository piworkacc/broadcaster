import { combineReducers } from 'redux';
import userReducer from "./userReducer";
import videoReducer from "./videoReducer";


const rootReducer = combineReducers({ user: userReducer, video: videoReducer });

export default rootReducer;

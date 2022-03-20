import { all } from 'redux-saga/effects';
import getUserVideosWatcher from './getUserVideosSaga';
import loginWatcher from './loginSaga';
import registerWatcher from './registerSaga';

export default function* rootSaga() {
  yield all([
    loginWatcher(),
    registerWatcher(),
    getUserVideosWatcher(),
  ]);
}

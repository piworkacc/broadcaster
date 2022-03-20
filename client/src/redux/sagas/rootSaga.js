import { all } from 'redux-saga/effects';
import loginWatcher from './loginSaga';
import registerWatcher from './registerSaga';

export default function* rootSaga() {
  yield all([
    loginWatcher(),
    registerWatcher(),
  ]);
}

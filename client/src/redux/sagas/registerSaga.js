import { call, put, takeLatest } from 'redux-saga/effects';
import { setAuth } from '../actions/userAction';
import { REGISTER_REQUESTED } from '../actionTypes/userTypes';

function register(payload) {
  return payload.service.uxios('/api/users', 'POST', payload.user);
}

function* registerWorker(action) {
  const data = yield call(register, action.payload);
  if (data) {
    yield put(setAuth(data));
  }
}

function* registerWatcher() {
  yield takeLatest(REGISTER_REQUESTED, registerWorker);
}

export default registerWatcher;

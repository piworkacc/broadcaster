import { call, put, takeLatest } from 'redux-saga/effects';
import { setAuth } from '../actions/userAction';
import { REGISTER_REQUESTED } from '../actionTypes/userTypes';

function register(payload) {
  return payload.service.uxios('http://localhost:3001/api/users', 'POST', payload.user);
}

function* registerWorker(action) {
  const data = yield call(register, action.payload);
  if (data) {
    yield put(setAuth(data.name));
  }
}

function* registerWatcher() {
  yield takeLatest(REGISTER_REQUESTED, registerWorker);
}

export default registerWatcher;

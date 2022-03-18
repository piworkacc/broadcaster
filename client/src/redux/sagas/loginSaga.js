import { call, put, takeLatest } from 'redux-saga/effects';
import { setAuth } from '../actions/userAction';
import { AUTH_REQUESTED } from '../actionTypes/userTypes';


function login(payload) {
  return payload.service.uxios('/api/users/login', 'POST', payload.user);
}

function* loginWorker(action) {
  const data = yield call(login, action.payload);
  if (data) {
    yield put(setAuth(data.name));
  }
}

function* loginWatcher() {
  yield takeLatest(AUTH_REQUESTED, loginWorker);
}

export default loginWatcher;

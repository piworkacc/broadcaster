import { call, put, takeLatest, delay, all } from 'redux-saga/effects';
import { allStreams } from '../actions/streamAction';
import { SEARCH_REQUESTED } from '../actionTypes/streamTypes';

async function search(value, service) {
  return service.uxios(`/api/streams/?=${value}`);
}

function* searchWorker({ type, payload: { value, service } }) {
  const data = yield call(search, value, service);
  if (data) {
    yield put(allStreams(data));
  }
}

function* searchWatcher() {
  yield takeLatest(SEARCH_REQUESTED, searchWorker);
}

export default searchWatcher;

import { call, put, takeLatest, delay, all } from 'redux-saga/effects';
import { selectionSize } from '../../utils/constants';
import { allStreams } from '../actions/streamAction';
import { getAllVideos } from '../actions/videoAction';
import { SEARCH_REQUESTED } from '../actionTypes/streamTypes';

async function search(value, service) {
  const data = {};
  data.streams = await service.uxios(`/api/streams/?search=${value}`);
  data.videos = await service.uxios(
    `/api/streams/selection/${selectionSize}/?search=${value}`,
  );

  return data;
}

function* searchWorker({ type, payload: { value, service } }) {
  yield delay(1000);
  const data = yield call(search, value, service);
  if (data.streams) {
    yield put(allStreams(data.streams));
    yield put(getAllVideos(data.videos));
  }
}

function* searchWatcher() {
  yield takeLatest(SEARCH_REQUESTED, searchWorker);
}

export default searchWatcher;

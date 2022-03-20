import { call, takeLatest, put } from 'redux-saga/effects';
import { getUserVideos } from "../actions/videoAction";
import { GET_USER_VIDEOS } from "../actionTypes/videoTypes";

function* getUserVideosWorker(action) {
  let data = [];
  if (action.payload.userId) {
    data = yield call(
      (payload) => payload.service.uxios(`/api/streams/user/${payload.userId}`),
      action.payload,
    );
  }
  if (data) {
    yield put(getUserVideos(data));
  }
}

function* getUserVideosWatcher() {
  yield takeLatest(GET_USER_VIDEOS, getUserVideosWorker);
}

export default getUserVideosWatcher;


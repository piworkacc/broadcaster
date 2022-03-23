import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import createSagaMiddleware from 'redux-saga';

import rootSaga from './sagas/rootSaga';
import rootReducer from './reducers/rootReducer';
import thunk from 'redux-thunk';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk, sagaMiddleware)),
);

sagaMiddleware.run(rootSaga);

store.subscribe(() => {
  const { auth, videos } = store.getState();
  window.localStorage.setItem('state', JSON.stringify({ auth, videos }));
});

export default store;

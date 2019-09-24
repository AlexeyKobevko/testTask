import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web


import { rootReducer } from './reducers';
const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// const logger = store => next => action => {
//     console.log('Action', action);
//     console.log('Prev state', store.getState());
//     next(action);
//     console.log('Next state', store.getState());
// };

export const store = createStore(
  persistedReducer,
  applyMiddleware(logger, thunk),
);

export const persistor = persistStore(store);
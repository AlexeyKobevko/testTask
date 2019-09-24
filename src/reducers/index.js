import { combineReducers } from 'redux';

import { newsReducer } from './news';
import { userReducer } from './user';

export const rootReducer = combineReducers({
  news: newsReducer,
  user: userReducer,
});
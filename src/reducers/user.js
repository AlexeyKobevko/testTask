import { handleActions } from 'redux-actions';

import {loadStart, dataRecieved, errorOccured, logout} from "actions/user";
import {ucFirst} from "../functions/ucFirst";

const initialState = {
  id: null,
  isLoggedIn: false,
  loading: false,
  error: false,
  errorText: '',
};

export const userReducer = handleActions({
  [loadStart]: (state) => {
    return {
      ...state,
      loading: true,
    }
  },
  [dataRecieved]: (state, action) => {
    const data = action.payload;
    console.log(data);
    if (data.status === 'ok') {
      return {
        ...state,
        id: data.data.id,
        isLoggedIn: true,
        loading: false,
      }
    }
    if (data.status === 'err') {
      return {
        ...state,
        error: true,
        errorText: ucFirst(data.message.replace(/_/g, ' ')),
        loading: false,
      }
    }
  },
  [errorOccured]: (state, action) => {
    const data = action.payload;
    return {
      ...state,
      loading: false,
      error: true,
      errorText: ucFirst(data.message.replace(/_/g, ' ')),
    }
  },
  [logout]: (state) => {
    return {
      ...state,
      id: null,
      isLoggedIn: false,
      loading: false,
      error: false,
      errorText: '',
    }
  }
}, initialState);
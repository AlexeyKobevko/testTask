import { handleActions } from 'redux-actions';

import { loadStart, dataRecieved, errorOccured } from 'actions/news';

const initialState = {
    loading: false,
    error: false,
    errorText: '',
    entries: [],
};

export const newsReducer = handleActions({
    [loadStart]: (state) => {
        return {
            ...state,
            loading: true,
        };
    },
    [dataRecieved]: (state, action) => {
        const data = action.payload;
        if (data.status === 'ok') {
          return {
            ...state,
            entries: data.data,
            loading: false,
          };
        }
        if (data.status === 'err') {
          return {
            ...state,
            error: true,
            errorText: data.message,
            loading: false,
          }
        }

    },
    [errorOccured]: (state) => {
        return {
            ...state,
            loading: false,
            error: true,
        };
    }
}, initialState);
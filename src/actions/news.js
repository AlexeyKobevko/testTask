import { createAction } from 'redux-actions';

export const loadStart = createAction('[News] Load start');
export const dataRecieved = createAction('[News] Data recieved');
export const errorOccured = createAction('[News] Error occured');

export const load = () => (dispatch, getState) => {
  const state = getState();

  dispatch(loadStart());

  fetch('https://mysterious-reef-29460.herokuapp.com/api/v1/news', {
    headers: {
        'Content-type': 'application/json',
    },
  })
    .then(response => response.json())
    .then(data => {
      dispatch(dataRecieved(data));
    })
    .catch(error => {
      dispatch(errorOccured());
    });
};
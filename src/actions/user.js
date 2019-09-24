import { createAction } from 'redux-actions';
import { endpoints } from "../../endpoints";

export const loadStart = createAction('[User] Load start');
export const dataRecieved = createAction('[User] Data recieved');
export const errorOccured = createAction('[User] Error occured');
export const logout = createAction('[User] Sign out');

export const checkUser = (email, password) => (dispatch, getState) => {
  const state = getState();

  dispatch(loadStart());

  fetch(endpoints.auth, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({email, password}),
  })
    .then(response => response.json())
    .then(data => {
      dispatch(dataRecieved(data));
    })
    .catch(error => {
      dispatch(errorOccured(error));
    });
};
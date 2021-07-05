import { SET_REDIRECT, REMOVE_REDIRECT } from './types';

export const redirect_to = link => dispatch => {
    dispatch({ 
        type: SET_REDIRECT,
        payload: link 
    });
  };

  export const done_redirect = () => dispatch => {
    dispatch({ 
        type: REMOVE_REDIRECT
    });
  };
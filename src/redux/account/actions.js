import { UPDATE_LOGGEDIN_USER } from './actionTypes';

export const updateLoggedInUser = (token, userInfo) => ({
  type: UPDATE_LOGGEDIN_USER,
  payload: {
    token,
    userInfo
  }
});

import { UPDATE_LOGGEDIN_USER } from './actionTypes';

const initialState = {
  token: null,
  userInfo: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_LOGGEDIN_USER:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}

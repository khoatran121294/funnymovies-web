import { combineReducers } from "redux";
import { reducer as toastrReducer } from "react-redux-toastr";
import accountReducer from "./account/reducer";

export default combineReducers({
  toastr: toastrReducer, // <- Mounted at toastr.
  account: accountReducer,
});

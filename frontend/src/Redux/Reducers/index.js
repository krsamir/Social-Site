import { combineReducers } from "redux";
import toastReducer from "./ToastReducer";
import userReducer from "./UserReducer";
import AdminReducers from "./AdminReducers";
export default combineReducers({
  toast: toastReducer,
  user: userReducer,
  admin: AdminReducers,
});

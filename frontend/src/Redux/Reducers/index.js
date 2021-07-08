import { combineReducers } from "redux";
import toastReducer from "./ToastReducer";
import userReducer from "./UserReducer";
import AdminReducers from "./AdminReducers";
import Feed from "./FeedsReducer";
export default combineReducers({
  toast: toastReducer,
  user: userReducer,
  admin: AdminReducers,
  feed: Feed,
});

import { combineReducers } from "redux";
import approvedReducer from "./Approved.reducer";
import authReducer from "./Auth.reducer";
import dashboardReducer from "./Dashboard.reducer";
import projectReducer from "./Project.reducer";
import redirectReducer from "./Redirect.reducer";

const reducer = combineReducers({
  auth: authReducer,
  dashboard: dashboardReducer,
  project: projectReducer,
  redirect: redirectReducer,
  approved: approvedReducer,
});

export default reducer;

import { combineReducers } from "redux";
import authReducer from "./Auth.reducer";
import dashboardReducer from "./Dashboard.reducer";
import projectReducer from "./Project.reducer";

const reducer = combineReducers({
  auth: authReducer,
  dashboard: dashboardReducer,
  project: projectReducer,
});

export default reducer;

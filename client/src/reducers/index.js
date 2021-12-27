import { combineReducers } from "redux";
import authReducer from "./Auth.reducer";
import dashboardReducer from "./Dashboard.reducer";
const reducer = combineReducers({
  auth: authReducer,
  dashboard: dashboardReducer,
});

export default reducer;

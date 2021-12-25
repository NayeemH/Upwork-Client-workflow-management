import { combineReducers } from "redux";
import authReducer from "./Auth.reducer";
const reducer = combineReducers({
  auth: authReducer,
});

export default reducer;

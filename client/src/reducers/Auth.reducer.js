import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
} from "../constants/Type";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  user: {},
  loading: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
      };
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case LOGOUT_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        token: "",
        user: {},
        isAuthenticated: false,
        loading: false,
      };
    default:
      return state;
  }
};

export default authReducer;

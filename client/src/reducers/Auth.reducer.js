import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  ACCESS_TOKEN_SUCCESS,
  ACCESS_TOKEN_ERROR,
} from "../constants/Type";

const initialState = {
  token: "",
  isAuthenticated: false,
  user: {},
  err: "",
  loading: true,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        token: action.payload,
      };
    case ACCESS_TOKEN_SUCCESS:
      return {
        ...state,
        token: action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case ACCESS_TOKEN_ERROR:
      return {
        ...state,
        err: action.payload,
        isAuthenticated: false,
        loading: false,
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
        err: action.payload ? action.payload : "",
      };
    default:
      return state;
  }
};

export default authReducer;

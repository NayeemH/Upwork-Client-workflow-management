import { REDIRECT_TO_DASHBOARD, REDIRECT_TO_ROOT } from "../constants/Type";

const initialState = {
  redirectTo: "",
};

const redirectReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case REDIRECT_TO_DASHBOARD:
      if (payload === "") {
        return {
          ...state,
        };
      }
      return {
        ...state,
        redirectTo: payload,
      };
    case REDIRECT_TO_ROOT:
      if (payload === "") {
        return {
          ...state,
        };
      }
      return {
        ...state,
        redirectTo: payload,
      };
    default:
      return state;
  }
};

export default redirectReducer;

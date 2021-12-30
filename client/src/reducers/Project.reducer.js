import {
  ACCOUNT_CREATE_ERROR,
  ACCOUNT_CREATE_SUCCESS,
  GET_INVITED_PROJECT_DETAILS,
  GET_PROJECT_DETAILS,
} from "../constants/Type";

const initialState = {
  selected_project: {},
  invited_project: {},
  err: "",
  loading: false,
};

const projectReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_PROJECT_DETAILS:
      return {
        ...state,
        selected_project: { ...payload },
        loading: false,
      };
    case GET_INVITED_PROJECT_DETAILS:
      return {
        ...state,
        invited_project: { ...payload },
        loading: false,
      };
    case ACCOUNT_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case ACCOUNT_CREATE_ERROR:
      return {
        ...state,
        err: payload ? payload : "",
        loading: false,
      };
    default:
      return state;
  }
};

export default projectReducer;

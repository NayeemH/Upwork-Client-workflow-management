import {
  ACCOUNT_CREATE_ERROR,
  ACCOUNT_CREATE_SUCCESS,
  ADD_FAVORITE_PROJECT,
  FETCH_DASHBOARD_PROJECT,
  GET_INVITED_PROJECT_DETAILS,
  GET_PROJECT_DETAILS,
  REMOVE_FAVORITE_PROJECT,
} from "../constants/Type";

const initialState = {
  projects: [],
  fav_projects: localStorage.getItem("fav_projects")
    ? localStorage.getItem("fav_projects").split(",")
    : [],
  selected_project: {},
  invited_project: {},
  err: "",
  loading: true,
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
    case FETCH_DASHBOARD_PROJECT:
      return {
        ...state,
        loading: false,
        projects: payload,
      };
    case ADD_FAVORITE_PROJECT:
    case REMOVE_FAVORITE_PROJECT:
      return {
        ...state,
        fav_projects: payload,
      };

    default:
      return state;
  }
};

export default projectReducer;

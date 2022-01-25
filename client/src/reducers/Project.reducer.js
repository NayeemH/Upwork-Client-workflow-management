import {
  ACCOUNT_CREATE_ERROR,
  ACCOUNT_CREATE_SUCCESS,
  ADD_COLLECTION_ERROR,
  ADD_FAVORITE_PROJECT,
  COLLECTION_INDEX,
  COLLECTION_NEXT,
  COLLECTION_PREV,
  FETCH_DASHBOARD_PROJECT,
  GET_INVITED_PROJECT_DETAILS,
  GET_PROJECT_DETAILS,
  GET_STEP,
  GET_STEP_ERROR,
  PROJECT_CREATE_ERROR,
  REMOVE_FAVORITE_PROJECT,
} from "../constants/Type";

const initialState = {
  projects: [],
  fav_projects: localStorage.getItem("fav_projects")
    ? localStorage.getItem("fav_projects").split(",")
    : [],
  selected_project: {},
  invited_project: {},
  selected_step: {},
  selected_collection: 0,
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
    case GET_STEP:
      return {
        ...state,
        selected_step: { ...payload },
        selected_collection: payload.collections.length - 1,
        loading: false,
      };
    case COLLECTION_NEXT:
      return {
        ...state,
        selected_collection:
          state.selected_collection < state.selected_step.collections.length - 1
            ? state.selected_collection + 1
            : state.selected_collection,
      };
    case COLLECTION_PREV:
      return {
        ...state,
        selected_collection:
          state.selected_collection > 0
            ? state.selected_collection - 1
            : state.selected_collection,
      };
    case COLLECTION_INDEX:
      return {
        ...state,
        selected_collection: payload,
      };
    case ADD_COLLECTION_ERROR:
    case GET_STEP_ERROR:
    case PROJECT_CREATE_ERROR:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default projectReducer;

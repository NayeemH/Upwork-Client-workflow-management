import {
  APPROVED_PROJECT_LOAD,
  APPROVED_PROJECT_LOAD_ERROR,
} from "../constants/Type";

const initialState = {
  approved_projects: [],
  loading: true,
};

const approvedReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case APPROVED_PROJECT_LOAD:
      return {
        ...state,
        loading: false,
        approved_projects: payload,
      };

    case APPROVED_PROJECT_LOAD_ERROR:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default approvedReducer;

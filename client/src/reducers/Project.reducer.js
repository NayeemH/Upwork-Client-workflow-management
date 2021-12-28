import {
  GET_INVITED_PROJECT_DETAILS,
  GET_PROJECT_DETAILS,
} from "../constants/Type";

const initialState = {
  selected_project: {},
  invited_project: {},
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
    default:
      return state;
  }
};

export default projectReducer;

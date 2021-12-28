import { DASHBOARD_PROJECT_LIST_GRID } from "../constants/Type";

const initialState = {
  projectListGrid: "grid",
  loading: true,
};

const dashboardReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case DASHBOARD_PROJECT_LIST_GRID:
      return {
        ...state,
        projectListGrid: payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default dashboardReducer;

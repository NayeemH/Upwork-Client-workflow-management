import { DASHBOARD_PROJECT_LIST_GRID, SIDEBAR_TOGGLE } from "../constants/Type";

const initialState = {
  projectListGrid: "grid",
  sidebar_visible: false,
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
    case SIDEBAR_TOGGLE:
      return {
        ...state,
        sidebar_visible: payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default dashboardReducer;

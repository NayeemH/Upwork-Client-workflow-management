import { DASHBOARD_PROJECT_LIST_GRID } from "../constants/Type";

const initialState = {
  projectListGrid: true,
  loading: true,
};

const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case DASHBOARD_PROJECT_LIST_GRID:
      return {
        ...state,
        projectListGrid: !state.projectListGrid,
        loading: false,
      };
    default:
      return state;
  }
};

export default dashboardReducer;

import { DASHBOARD_PROJECT_LIST_GRID } from "../constants/Type";

export const toogleDashboardProjectStyle = (type) => (dispatch) => {
  dispatch({
    type: DASHBOARD_PROJECT_LIST_GRID,
    payload: type,
  });
};

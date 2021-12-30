import { REDIRECT_TO_DASHBOARD, REDIRECT_TO_ROOT } from "../constants/Type";

//NAVIGATE TO DASHBOARD
export const navigateToDashboard = () => (dispatch) => {
  dispatch({
    type: REDIRECT_TO_DASHBOARD,
    payload: "/dashboard",
  });
};

//NAVIGATE TO DASHBOARD
export const navigateToRoot = () => (dispatch) => {
  dispatch({
    type: REDIRECT_TO_ROOT,
    payload: "/",
  });
};

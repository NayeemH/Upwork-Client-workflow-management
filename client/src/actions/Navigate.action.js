import { REDIRECT_TO_DASHBOARD } from "../constants/Type";

//NAVIGATE TO DASHBOARD
export const navigateToDashboard = () => (dispatch) => {
  dispatch({
    type: REDIRECT_TO_DASHBOARD,
    payload: "/dashboard",
  });
};

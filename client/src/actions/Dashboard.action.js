import axios from "axios";
import { toast } from "react-toastify";
import {
  DASHBOARD_PROJECT_LIST_GRID,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  REFRESH_TOKEN_GENARATED,
  SIDEBAR_TOGGLE,
} from "../constants/Type";
import { BASE_URL } from "../constants/URL";
import setAuthToken from "../utils/setAuthToken";
import { navigateToDashboard } from "./Navigate.action";

// PROJECT DISPLAY STYLE ACTION
export const toogleDashboardProjectStyle = (type) => (dispatch) => {
  dispatch({
    type: DASHBOARD_PROJECT_LIST_GRID,
    payload: type,
  });
};

//SIDEBAR TOOGLE ACTION
export const toogleSidebarVisibility = (type) => (dispatch) => {
  dispatch({
    type: SIDEBAR_TOGGLE,
    payload: type,
  });
};

// LOGIN ACTION
export const login = (values) => async (dispatch) => {
  let formData = {
    password: values.password,
    email: values.email,
  };

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };
  try {
    // TODO ::: API CALL
    const res = await axios.post(
      `${BASE_URL}/api/user/login`,
      JSON.stringify(formData),
      config
    );
    //console.log(res);
    if (res.status === 200) {
      dispatch({
        type: REFRESH_TOKEN_GENARATED,
      });
      try {
        const refreshRes = await axios.post(
          `${BASE_URL}/api/user/refreshToken`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        if (refreshRes.status === 200) {
          dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data.accessToken,
          });
          setAuthToken(res.data.accessToken);
          toast.success("Login successfully");
          dispatch(navigateToDashboard());
        }
      } catch (error) {
        dispatch({
          type: LOGIN_FAIL,
          payload: error.response.data.msg[0],
        });
        error.response.data.msg.map((msg) => toast.error(msg));
      }
    }
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
      payload: err.response.data.msg[0],
    });
    err.response.data.msg.map((msg) => toast.error(msg));
  }
};

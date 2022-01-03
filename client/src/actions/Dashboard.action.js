import axios from "axios";
import { toast } from "react-toastify";
import {
  ACCESS_TOKEN_ERROR,
  ACCESS_TOKEN_SUCCESS,
  DASHBOARD_PROJECT_LIST_GRID,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_FAIL,
  LOGOUT_SUCCESS,
  REFRESH_TOKEN_GENARATED,
  SIDEBAR_TOGGLE,
} from "../constants/Type";
import { BASE_URL } from "../constants/URL";
import setAuthToken from "../utils/setAuthToken";
import { navigateToRoot } from "./Navigate.action";

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
            payload: refreshRes.data.accessToken,
          });
          //console.log(res.data);
          setAuthToken(refreshRes.data.accessToken);
          toast.success("Login successfully");
          return true;
        }
      } catch (error) {
        dispatch({
          type: LOGIN_FAIL,
        });
        error.response.data.msg.map((msg) => toast.error(msg));
        return false;
      }
    }
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
      payload: err.response.data.msg[0],
    });
    err.response.data.msg.map((msg) => toast.error(msg));
    return false;
  }
};

//GET REFRESH TOKEN
export const getRefreshToken = () => async (dispatch) => {
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
        type: ACCESS_TOKEN_SUCCESS,
        payload: refreshRes.data.accessToken,
      });
      //console.log(res.data);
      setAuthToken(refreshRes.data.accessToken);
    }
  } catch (error) {
    dispatch({
      type: ACCESS_TOKEN_ERROR,
      payload: error.response.data.msg[0],
    });
    error.response.data.msg.map((msg) => toast.error(msg));
  }
};

//LOGOUT ACTION
export const logout = () => async (dispatch) => {
  try {
    const refreshRes = await axios.post(
      `${BASE_URL}/api/user/logout`,
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
        type: LOGOUT_SUCCESS,
      });
      toast.success("Logout successfully");
      dispatch(navigateToRoot());
      //console.log(res.data);
    }
  } catch (error) {
    dispatch({
      type: LOGOUT_FAIL,
      payload: error.response.data.msg[0],
    });
    error.response.data.msg.map((msg) => toast.error(msg));
  }
};

import axios from "axios";
import { useNavigate } from "react-router-dom";
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
      credentials: "include",
    },
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
        const refreshRes = axios.post(
          `${BASE_URL}/api/user/refreshToken`,
          {},
          { credentials: "include" }
        );
        if (refreshRes.status === 200) {
          dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data.accessToken,
          });
          setAuthToken(res.data.accessToken);
          toast.success("Login successfully");
          const navigate = useNavigate();
          navigate("/dashboard");
        }
      } catch (error) {
        toast.error("Error in refreshing token");
      }
    }
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
    });
    toast.error("Something went wrong");
    return false;
  }
};

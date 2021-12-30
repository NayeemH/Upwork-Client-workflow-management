import { toast } from "react-toastify";
import {
  ACCESS_TOKEN_SUCCESS,
  ACCOUNT_CREATE_ERROR,
  ACCOUNT_CREATE_SUCCESS,
  GET_INVITED_PROJECT_DETAILS,
  GET_PROJECT_DETAILS,
  PROJECT_INVITATION_ERROR,
  PROJECT_INVITATION_SUCCESS,
} from "../constants/Type";
import { BASE_URL } from "../constants/URL";
import axios from "axios";

// TODO::: DUMMY DATA IMPORTS
import data from "../stub/projects/dashboardProjectList.js";
import invited from "../stub/projects/projectDetails";
import { getRefreshToken } from "./Dashboard.action";
import { navigateToDashboard } from "./Navigate.action";

//GET PROJECT DETAILS FOR INVITED USER
export const getInvitedProjectDetails = (id) => (dispatch) => {
  dispatch({
    type: GET_INVITED_PROJECT_DETAILS,
    payload: invited,
  });
};

//GET PROJECT DETAILS WITH TASKS
export const getProjectDetails = (id) => (dispatch) => {
  const project = data.filter((project) => project.id === parseInt(id));
  dispatch({
    type: GET_PROJECT_DETAILS,
    payload: project[0],
  });
};

// SEND INVITATION LINK TO PROJECT
export const sendInvitation = (values) => async (dispatch) => {
  let formData = {
    projectId: values.project,
    userType: values.role,
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
      `${BASE_URL}/api/admin/sendLoginMail`,
      JSON.stringify(formData),
      config
    );
    console.log(res);
    if (res.status === 200) {
      dispatch({
        type: PROJECT_INVITATION_SUCCESS,
      });
      toast.success("Invitation sent successfully");
    }
  } catch (err) {
    dispatch({
      type: PROJECT_INVITATION_ERROR,
    });
    err.response.data.msg.map((msg) => toast.error(msg));
  }
};

// CREATE ACCOUNT
export const createAccount = (values) => async (dispatch) => {
  let formData = {
    username: values.username,
    password: values.password,
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
      `${BASE_URL}/api/activate/loginMail/notuser/${values.id}`,
      JSON.stringify(formData),
      config
    );
    console.log(res);
    if (res.status === 200) {
      dispatch({
        type: ACCOUNT_CREATE_SUCCESS,
      });
      dispatch(getRefreshToken());
      dispatch(navigateToDashboard());
      toast.success("Account created successfully");
    }
  } catch (err) {
    dispatch({
      type: ACCOUNT_CREATE_ERROR,
    });
    err.response.data.msg.map((msg) => toast.error(msg));
  }
};

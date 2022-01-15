import { toast } from "react-toastify";
import {
  ACCOUNT_CREATE_ERROR,
  ACCOUNT_CREATE_SUCCESS,
  GET_INVITED_PROJECT_DETAILS,
  GET_PROJECT_DETAILS,
  PROJECT_CREATE_ERROR,
  PROJECT_CREATE_SUCCESS,
  PROJECT_INVITATION_ERROR,
  PROJECT_INVITATION_SUCCESS,
} from "../constants/Type";
import { BASE_URL } from "../constants/URL";
import axios from "axios";

// TODO::: DUMMY DATA IMPORTS
import data from "../stub/projects/dashboardProjectList.js";
import invited from "../stub/projects/projectDetails";
import { getRefreshToken } from "./Dashboard.action";

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
    if (res.status === 200) {
      dispatch({
        type: ACCOUNT_CREATE_SUCCESS,
      });
      dispatch(getRefreshToken());
      toast.success("Account created successfully");
      return true;
    }
  } catch (err) {
    dispatch({
      type: ACCOUNT_CREATE_ERROR,
    });
    err.response.data.msg.map((msg) => toast.error(msg));
    return false;
  }
};

// CREATE PROJECT
export const createProject = (values, file) => async (dispatch) => {
  let formData = new FormData();

  formData.append("description", values.name);
  formData.append("name", values.description);
  formData.append("image", file);

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  };
  try {
    // TODO ::: API CALL
    const res = await axios.post(
      `${BASE_URL}/api/admin/createProject`,
      formData,
      config
    );
    console.log(res);
    if (res.status === 200) {
      dispatch({
        type: PROJECT_CREATE_SUCCESS,
      });
      toast.success("Project created successfully");
      return true;
    }
  } catch (err) {
    dispatch({
      type: PROJECT_CREATE_ERROR,
    });
    err.response.data.msg.map((msg) => toast.error(msg));
    return false;
  }

  return false;
};

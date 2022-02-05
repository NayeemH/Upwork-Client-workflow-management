import { toast } from "react-toastify";
import {
  ACCOUNT_CREATE_ERROR,
  ACCOUNT_CREATE_SUCCESS,
  ADD_COLLECTION_ERROR,
  ADD_COLLECTION_SUCCESS,
  ADD_FAVORITE_PROJECT,
  COLLECTION_INDEX,
  COLLECTION_NEXT,
  COLLECTION_PREV,
  EDIT_FEEDBACK_ERROR,
  EDIT_FEEDBACK_SUCCESS,
  FETCH_DASHBOARD_PROJECT,
  FETCH_DASHBOARD_PROJECT_ERROR,
  GET_INVITED_PROJECT_DETAILS,
  GET_PROJECT_DETAILS,
  GET_STEP,
  GET_STEP_ERROR,
  PROJECT_ACCEPT_EXISTING_USER,
  PROJECT_ACCEPT_EXISTING_USER_ERROR,
  PROJECT_CREATE_ERROR,
  PROJECT_CREATE_SUCCESS,
  PROJECT_INVITATION_ERROR,
  PROJECT_INVITATION_SUCCESS,
  REVIEW_ADDED,
  REVIEW_ADDED_ERROR,
  STEP_APPROVED,
  STEP_APPROVE_ERROR,
  TASK_ADDED,
  TASK_ADDED_ERROR,
} from "../constants/Type";
import { BASE_URL } from "../constants/URL";
import axios from "axios";
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
export const getProjectDetails = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`${BASE_URL}/api/project/one/${id}`);
    // console.log(res);

    dispatch({
      type: GET_PROJECT_DETAILS,
      payload: res.data,
    });
  } catch (err) {
    err.response.data.msg.map((msg) => toast.error(msg));
  }
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
    // console.log(res);
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

// CREATE ACCOUNT EXISTING USER
export const createAccountExisting = (id) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };
  try {
    // TODO ::: API CALL
    const res = await axios.post(
      `${BASE_URL}/api/activate/loginMail/user/${id}`,
      {},
      config
    );
    if (res.status === 200) {
      dispatch({
        type: PROJECT_ACCEPT_EXISTING_USER,
      });
      toast.success("Project accepted successfully");
      return true;
    }
  } catch (err) {
    dispatch({
      type: PROJECT_ACCEPT_EXISTING_USER_ERROR,
    });
    err.response.data.msg.map((msg) => toast.error(msg));
    return false;
  }
};

// CREATE PROJECT
export const createProject = (values, file) => async (dispatch) => {
  let formData = new FormData();

  formData.append("description", values.description);
  formData.append("name", values.name);
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
    // console.log(res);
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

// FETCH PROJECTS FOR DASHBOARD
export const fetchProjects = () => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };
  try {
    // TODO ::: API CALL
    const res = await axios.get(`${BASE_URL}/api/project/active`, config);
    if (res.status === 200) {
      dispatch({
        type: FETCH_DASHBOARD_PROJECT,
        payload: res.data,
      });
    }
  } catch (err) {
    dispatch({
      type: FETCH_DASHBOARD_PROJECT_ERROR,
    });
  }
};

// ADD FAVORITE PROJECT IN LOCAL STORAGE
export const addFavoriteProject = (id) => (dispatch) => {
  let saved = localStorage.getItem("fav_projects")
    ? localStorage.getItem("fav_projects").split(" ")
    : [];
  if (!saved.includes(id)) {
    saved.push(id);
    localStorage.setItem("fav_projects", saved.join(" "));
  }

  dispatch({
    type: ADD_FAVORITE_PROJECT,
    payload: saved,
  });
};

// REMOVE FAVORITE PROJECT IN LOCAL STORAGE
export const removeFavoriteProject = (id) => (dispatch) => {
  let saved = localStorage.getItem("fav_projects")
    ? localStorage.getItem("fav_projects").split(" ")
    : [];

  localStorage.setItem(
    "fav_projects",
    saved.filter((item) => item !== id).join(" ")
  );

  dispatch({
    type: ADD_FAVORITE_PROJECT,
    payload: saved.filter((item) => item !== id).join(" "),
  });
};

// CREATE PROJECT TASK
export const createProjectTask =
  (values, file, id, steps) => async (dispatch) => {
    let formData = new FormData();

    formData.append("name", values.name);
    formData.append("image", file);
    formData.append("projectId", id);
    steps.map((step, i) => {
      formData.append(`steps[${i}]`, step.name);
      return null;
    });

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    };
    try {
      // TODO ::: API CALL
      const res = await axios.post(
        `${BASE_URL}/api/project/addProduct`,
        formData,
        config
      );
      // console.log(res);
      if (res.status === 200) {
        dispatch({
          type: TASK_ADDED,
        });
        dispatch(getProjectDetails(id));
        toast.success("TASK created successfully");
        return true;
      }
    } catch (err) {
      dispatch({
        type: TASK_ADDED_ERROR,
      });
      err.response.data.msg.map((msg) => toast.error(msg));
      return false;
    }

    return false;
  };

//GET STEP DATA
export const getStepDetails = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`${BASE_URL}/api/project/step/${id}`);
    //console.log(res);

    dispatch({
      type: GET_STEP,
      payload: res.data,
    });
    //console.log(res);
  } catch (err) {
    dispatch({
      type: GET_STEP_ERROR,
    });
    if (err.response.data.msg) {
      err.response.data.msg.map((msg) => toast.error(msg));
    }
  }
};

// UPLOAD PROJECT STEP
export const uploadStep = (values, file, id, projectId) => async (dispatch) => {
  let formData = new FormData();

  formData.append("title", values.title);
  formData.append("description", values.description);
  formData.append("imageType", values.type);
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
      `${BASE_URL}/api/project/collection/${id}`,
      formData,
      config
    );
    // console.log(res);
    if (res.status === 200) {
      dispatch({
        type: ADD_COLLECTION_SUCCESS,
      });
      dispatch(getProjectDetails(projectId));
      toast.success("Image uploaded successfully");
      return true;
    }
  } catch (err) {
    dispatch({
      type: ADD_COLLECTION_ERROR,
    });
    err.response.data.msg.map((msg) => toast.error(msg));
    return false;
  }

  return false;
};

export const selectedCollectionChange = (next) => (dispatch) => {
  if (next === true) {
    dispatch({
      type: COLLECTION_NEXT,
    });
  } else {
    dispatch({
      type: COLLECTION_PREV,
    });
  }
};

export const selectIndex = (index) => (dispatch) => {
  dispatch({
    type: COLLECTION_INDEX,
    payload: index,
  });
};

// APPROVE STEP
export const approveStep = (id, projectId) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };
  try {
    // TODO ::: API CALL
    await axios.post(`${BASE_URL}/api/project/stepApprove/${id}`, {}, config);
    // console.log(res);
    dispatch({
      type: STEP_APPROVED,
    });
    dispatch(getProjectDetails(projectId));
    toast.success("Step Approved successfully");
    return true;
  } catch (err) {
    dispatch({
      type: STEP_APPROVE_ERROR,
    });
    err.response.data.msg.map((msg) => toast.error(msg));
    return false;
  }
};

// POST REVIEW
export const postReview = (points, msg, stepId) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };

  const formData = {
    message: msg,
    points: [points.x, points.y],
  };
  try {
    // TODO ::: API CALL
    await axios.post(
      `${BASE_URL}/api/project/feedback/${points.stepId}`,
      JSON.stringify(formData),
      config
    );
    //console.log(res);
    dispatch({
      type: REVIEW_ADDED,
    });
    dispatch(getStepDetails(stepId));
    toast.success("Feedback added successfully");
    return true;
  } catch (err) {
    dispatch({
      type: REVIEW_ADDED_ERROR,
    });
    err.response.data.msg.map((msg) => toast.error(msg));
    return false;
  }
};

// EDIT REVIEW
export const editReview = (msg, id, stepId) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };

  const formData = {
    message: msg,
  };
  try {
    // TODO ::: API CALL
    await axios.patch(
      `${BASE_URL}/api/project/feedback/${id}`,
      JSON.stringify(formData),
      config
    );
    //console.log(res);
    dispatch({
      type: EDIT_FEEDBACK_SUCCESS,
    });
    dispatch(getStepDetails(stepId));
    toast.success("Feedback edited successfully");
    return true;
  } catch (err) {
    dispatch({
      type: EDIT_FEEDBACK_ERROR,
    });
    err.response.data.msg.map((msg) => toast.error(msg));
    return false;
  }
};

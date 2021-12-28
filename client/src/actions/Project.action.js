import {
  GET_INVITED_PROJECT_DETAILS,
  GET_PROJECT_DETAILS,
} from "../constants/Type";
import data from "../stub/projects/dashboardProjectList.js";
import invited from "../stub/projects/projectDetails";

export const getInvitedProjectDetails = (id) => (dispatch) => {
  dispatch({
    type: GET_INVITED_PROJECT_DETAILS,
    payload: invited,
  });
};
export const getProjectDetails = (id) => (dispatch) => {
  const project = data.filter((project) => project.id === parseInt(id));
  dispatch({
    type: GET_PROJECT_DETAILS,
    payload: project[0],
  });
};

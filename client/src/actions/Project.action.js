import { GET_PROJECT_DETAILS } from "../constants/Type";
import data from "../stub/projects/dashboardProjectList.js";

export const getProjectDetails = (id) => (dispatch) => {
  const project = data.filter((project) => project.id === parseInt(id));
  dispatch({
    type: GET_PROJECT_DETAILS,
    payload: project[0],
  });
};

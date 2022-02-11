import { GET_ORG_DATA } from "../constants/Type";

const checkDomain = () => {
  let loc = window.location.host.split(".")[0];
  if (loc === "localhost" || loc === "localhost:3000") {
    return "";
  } else {
    return loc;
  }
};

const initialValues = {
  subdomain: checkDomain(),
  logo: localStorage.getItem("logo"),
  loading: true,
};

const domainReducer = (state = initialValues, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_ORG_DATA:
      return {
        ...state,
        loading: false,
        subdomain: payload.subdomain,
        logo: payload.companyLogo,
      };
    default:
      return state;
  }
};

export default domainReducer;

import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { getRefreshToken } from "../actions/Dashboard.action";

const PrivateOutlet = ({ getRefreshToken, auth, loading }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (auth === false) {
      let check = getRefreshToken();
      if (check === true) {
        return <Outlet />;
      } else {
        navigate("/");
      }
    }
  }, [auth, getRefreshToken]);
  return auth === true && loading === false ? <Outlet /> : null;
};

const mapStateToProps = (state) => ({
  auth: state.auth.isAuthenticated,
  loading: state.auth.loading,
});

export default connect(mapStateToProps, { getRefreshToken })(PrivateOutlet);

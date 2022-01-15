import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { getRefreshToken } from "../actions/Dashboard.action";

const PrivateOutlet = () => {
  const auth = useSelector((state) => state.auth.isAuthenticated);
  const loading = useSelector((state) => state.auth.loading);
  const dispatch = useDispatch();
  useEffect(() => {
    if (auth === false) {
      dispatch(getRefreshToken());
    }
  }, [auth]);
  return auth === true && loading === false ? <Outlet /> : null;
};

export default PrivateOutlet;

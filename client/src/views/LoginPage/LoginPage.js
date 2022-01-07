import React from "react";
import Login from "../../components/Login/Login";
import RefreshTokenLayout from "../../components/shared/RefreshTokenLayout/RefreshTokenLayout";

const LoginPage = () => {
  return (
    <>
      <RefreshTokenLayout>
        <Login />
      </RefreshTokenLayout>
    </>
  );
};

export default LoginPage;

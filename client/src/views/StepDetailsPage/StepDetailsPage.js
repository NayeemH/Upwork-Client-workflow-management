import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import StepDetails from "../../components/StepDetails/StepDetails";
import Topbar from "../../components/Topbar/Topbar";

const StepDetailsPage = () => {
  return (
    <div className={`bg-dark text-light`} style={{ minHeight: "100vh" }}>
      <Topbar />
      <Sidebar />
      <StepDetails />
    </div>
  );
};

export default StepDetailsPage;

import React from "react";
import FilterDashboard from "../../components/FilterDashboard/FilterDashboard";
import Topbar from "../../components/Topbar/Topbar";

const DashboardPage = () => {
  return (
    <div className="bg-dark" style={{ height: "100vh" }}>
      <Topbar />
      <FilterDashboard />
    </div>
  );
};

export default DashboardPage;

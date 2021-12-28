import React from "react";
import DashboardCards from "../../components/DashboardCards/DashboardCards";
import FilterDashboard from "../../components/FilterDashboard/FilterDashboard";
import Topbar from "../../components/Topbar/Topbar";

const DashboardPage = () => {
  return (
    <div className="bg-dark" style={{ minHeight: "100vh" }}>
      <Topbar />
      <FilterDashboard />
      <DashboardCards />
    </div>
  );
};

export default DashboardPage;

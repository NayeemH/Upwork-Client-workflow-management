import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import {
  LoginPage,
  FogetPasswordPage,
  DashboardPage,
  ProjectDetailsPage,
  ProjectInvitationPage,
  AddUserPage,
  NewAccountPage,
} from "./views";
import { ToastContainer } from "react-toastify";
import PrivateOutlet from "./utils/PrivateOutlet";
import AddProjectPage from "./views/AddProjectPage/AddProjectPage";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRefreshToken, setRole } from "./actions/Dashboard.action";
import PasswordChangePage from "./views/PasswordChangePage/PasswordChangePage";
import SettingsPage from "./views/SettingsPage/SettingsPage";
import AddTaskPage from "./views/AddTaskPage/AddTaskPage";
import PasswordChangeSettings from "./views/PasswordChangeSettings/PasswordChangeSettings";
import ManagerListPage from "./views/ManagerListPage/ManagerListPage";
import StepDetailsPage from "./views/StepDetailsPage/StepDetailsPage";
import ClientListPage from "./views/ClientListPage/ClientListPage";
import UploadStepImagePage from "./views/UploadStepImagePage/UploadStepImagePage";
import ViewerPage from "./views/ViewerPage/ViewerPage";
import DownloadPage from "./views/DownloadPage/DownloadPage";
import DeveloperListPage from "./views/DeveloperListPage/DeveloperListPage";
import { useJwt } from "react-jwt";
import ApprovedPage from "./views/ApprovedPage/ApprovedPage";

function App() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const role = useSelector((state) => state.dashboard.role);
  const { decodedToken } = useJwt(token);
  if (decodedToken) {
    dispatch(setRole(decodedToken.userType));
  }

  useEffect(() => {
    dispatch(getRefreshToken());
  }, []);
  return (
    <>
      <ToastContainer newestOnTop theme="dark" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/forget-password" element={<FogetPasswordPage />} />
          <Route
            path="/activate/loginMail/:status/:id"
            element={<ProjectInvitationPage />}
          />
          <Route path="/create-account/:id" element={<NewAccountPage />} />
          <Route
            path="/activate/resetPassword/:id"
            element={<PasswordChangePage />}
          />
          <Route path="/*" element={<PrivateOutlet />}>
            <>
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="approved" element={<ApprovedPage />} />
              <Route path="project/:id" element={<ProjectDetailsPage />} />
              <Route path="project/:id/download" element={<DownloadPage />} />
              <Route
                path="project/:projectId/step/:stepId"
                element={<StepDetailsPage />}
              />
              <Route
                path="project/add-task/:id"
                element={
                  role === "admin" ||
                  role === "manager" ||
                  role === "developer" ? (
                    <AddTaskPage />
                  ) : (
                    <Navigate to="/dashboard" />
                  )
                }
              />
              <Route
                path="project/:projectId/step/:stepId/upload"
                element={
                  role === "client" ? (
                    <Navigate to="/dashboard" />
                  ) : (
                    <UploadStepImagePage />
                  )
                }
              />
              <Route
                path="add-user"
                element={
                  role !== "admin" ? (
                    <Navigate to="/dashboard" />
                  ) : (
                    <AddUserPage />
                  )
                }
              />
              <Route
                path="add-project"
                element={
                  role !== "admin" ? (
                    <Navigate to="/dashboard" />
                  ) : (
                    <AddProjectPage />
                  )
                }
              />
              <Route path="settings" element={<SettingsPage />} />
              <Route
                path="manager-list"
                element={
                  role !== "admin" ? (
                    <Navigate to="/dashboard" />
                  ) : (
                    <ManagerListPage />
                  )
                }
              />
              <Route
                path="developer-list"
                element={
                  role !== "admin" ? (
                    <Navigate to="/dashboard" />
                  ) : (
                    <DeveloperListPage />
                  )
                }
              />
              <Route
                path="client-list"
                element={
                  role !== "admin" ? (
                    <Navigate to="/dashboard" />
                  ) : (
                    <ClientListPage />
                  )
                }
              />
              <Route path="viewer" element={<ViewerPage />} />
              <Route
                path="settings/password"
                element={<PasswordChangeSettings />}
              />
            </>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

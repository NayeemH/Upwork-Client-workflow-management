import { Routes, Route, BrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
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
import { useDispatch } from "react-redux";
import { getRefreshToken } from "./actions/Dashboard.action";
import PasswordChangePage from "./views/PasswordChangePage/PasswordChangePage";

function App() {
  const dispatch = useDispatch();
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
              <Route path="project/:id" element={<ProjectDetailsPage />} />
              <Route path="add-user" element={<AddUserPage />} />
              <Route path="add-project" element={<AddProjectPage />} />
            </>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

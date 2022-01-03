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

function App() {
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
          <Route path="/*" element={<PrivateOutlet />}>
            <>
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="project/:id" element={<ProjectDetailsPage />} />
              <Route path="add-user" element={<AddUserPage />} />
            </>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

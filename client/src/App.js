import { Provider } from "react-redux";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import store from "./store/Store";

import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  LoginPage,
  FogetPasswordPage,
  DashboardPage,
  ProjectDetailsPage,
  ProjectInvitationPage,
} from "./views";
import { ToastContainer } from "react-toastify";
import NewAccountPage from "./views/NewAccountPage/NewAccountPage";

function App() {
  return (
    <Provider store={store}>
      <ToastContainer newestOnTop theme="dark" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/forget-password" element={<FogetPasswordPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/project/:id" element={<ProjectDetailsPage />} />
          <Route path="/invited/:id" element={<ProjectInvitationPage />} />
          <Route path="/create-account/:id" element={<NewAccountPage />} />
          <Route path="//add-user" element={<NewAccountPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

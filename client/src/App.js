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
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

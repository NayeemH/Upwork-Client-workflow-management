import { Provider } from "react-redux";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import store from "./store/Store";
import "bootstrap/dist/css/bootstrap.min.css";
import { LoginPage, FogetPasswordPage } from "./views";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/forget-password" element={<FogetPasswordPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./Components/Store/auth-context";
import { AddApartmentContextProvider } from "./Components/Store/addApartment-context";
import "./Components/locales/i18n";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthContextProvider>
    <AddApartmentContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AddApartmentContextProvider>
  </AuthContextProvider>
);

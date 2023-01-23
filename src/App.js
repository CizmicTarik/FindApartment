import { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import NavigationBar from "./Components/Layout/NavigationBar";
import Welcome from "../src/Pages/Welcome/index";
import Register from "../src/Pages/Register/index";
import Login from "../src/Pages/Login/index";
import Dashboard from "../src/Pages/Dashboard/index";
import Admin from "../src/Pages/Admin/index";
import Footer from "./Components/Layout/Footer";
import AuthContext from "./Components/Store/auth-context";
import { createTheme, colors, ThemeProvider } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: colors.grey[300],
    },
  },
});

const App = () => {
  const authContext = useContext(AuthContext);
  const isLoggedIn = authContext.isLoggedIn;

  return (
    <ThemeProvider theme={theme}>
      <NavigationBar />
      <Switch>
        <Route path="/" exact>
          {!isLoggedIn && <Redirect to="/welcome" />}
          {isLoggedIn && <Redirect to="/admin" />}
        </Route>
        <Route path="/welcome">
          {!isLoggedIn && <Welcome />}
          {isLoggedIn && <Redirect to="/admin" />}
        </Route>
        <Route path="/register">
          {!isLoggedIn && <Register />}
          {isLoggedIn && <Redirect to="/admin" />}
        </Route>
        <Route path="/login">
          {!isLoggedIn && <Login />}
          {isLoggedIn && <Redirect to="/admin" />}
        </Route>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
        <Route path="/admin">
          {isLoggedIn && <Admin />}
          {!isLoggedIn && <Redirect to="/login" />}
        </Route>
      </Switch>
      <Footer position="absolute" left="0" right="0" bottom="0" />
    </ThemeProvider>
  );
};

export default App;

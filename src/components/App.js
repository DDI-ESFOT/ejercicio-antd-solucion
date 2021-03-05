import "../styles/App.css";
import React from "react";
import MainLayout from "./MainLayout";
import HomePage from "../pages/HomePage";
import { Route, Switch } from "react-router-dom";
import AboutPage from "../pages/AboutPage";
import UsersPage from "../pages/UsersPage";
import NotFoundPage from "../pages/NotFoundPage";
import Routes from "../constants/routes";
import RegisterPage from "../pages/RegisterPage";
import { AuthProvider } from "../lib/auth";
import LoginPage from "../pages/LoginPage";

function App() {
  return (
    <>
      <AuthProvider>
        <MainLayout>
          <Switch>
            <Route path={Routes.HOME} exact={true}>
              <HomePage />
            </Route>
            <Route path={Routes.REGISTER}>
              <RegisterPage />
            </Route>
            <Route path={Routes.LOGIN}>
              <LoginPage />
            </Route>
            <Route path={Routes.ABOUT}>
              <AboutPage />
            </Route>
            <Route path={Routes.USERS}>
              <UsersPage />
            </Route>
            <Route>
              <NotFoundPage />
            </Route>
          </Switch>
        </MainLayout>
      </AuthProvider>
    </>
  );
}

export default App;

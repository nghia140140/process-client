import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import * as PATH from "~/configs/routesConfig";
import AuthorizedRoute from "./AuthorizedRoute";
import {
  Login
} from "~/views/container/AuthPage";
import SetUpProfile from '~/views/container/SetUpProfile'
import AddSection from "~/views/container/FarmingSeason/AddSeason";
import AddFarm from "~/views/container/Farm/AddFarm";
import AddProcess from "~/views/container/Process/AddProcess";
const AppRouter = props => {
  return (
    <Router>
      <Switch>
        <Route path={PATH.LOGIN_PATH} exact component={() => <Login />} />
        <Route path={PATH.ACCOUNT_RECOVERY_PATH} exact component={() => <Login />} />
        <Route path={PATH.RECOVERY_OTP_PATH} exact component={() => <Login />} />
        <Route path={PATH.REGISTER_OTP_PATH} exact component={() => <Login />} />
        <Route path={PATH.RECOVERY_CHANGE_PASSWORD_PATH} exact component={() => <Login />} />
        <Route path={PATH.REGISTER_PATH} exact component={() => <Login />} />
        <Route path={PATH.REGISTER_COMPLETED_PATH} exact component={() => <Login />} />
        <Route path={PATH.SETUP_PROFILE_PATH} exact component={() => <SetUpProfile />} />
        <Route path={PATH.ADD_SEASON} exact component={() => <AddSection />} />
        <Route path={PATH.ADD_FARM} exact component={() => <AddFarm />} />
        <Route path={PATH.ADD_PROCESS} exact component={() => <AddProcess />} />
        <AuthorizedRoute path={PATH.DASHBOARD_PATH} />
        <Redirect to={PATH.APP_DEFAULT_PATH} />
      </Switch>
    </Router>
  );
};

export default AppRouter;

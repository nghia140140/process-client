import React from "react";
import * as approute from "~/configs/routesConfig";
import Dashboard from "~/views/container/Dashboard";

export default [
  {
    path: approute.DASHBOARD_PATH,
    component: () => <Dashboard />,
    exact: true
  }
  
];


import React from "react";
import "./style.scss";
import appConfig from "../../app-config";

const AppHeader = () => (
  <div className="app-header">
    <span className="header-title">{appConfig.appName}</span>
  </div>
);

export default AppHeader;

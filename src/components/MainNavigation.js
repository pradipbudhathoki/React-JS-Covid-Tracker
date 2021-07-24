import React from "react";

import { Link } from "react-router-dom";

import "./MainNavigation.css";

import HomeIcon from "@material-ui/icons/Home";
import CallIcon from "@material-ui/icons/Call";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";

function MainNavigation(props) {
  return (
    <div className="nav">
      <div className="nav__left">
        <div className="nav__header">
          <Link to="/" className="nav__title">
            <h1>COVID-19 Tracker Nepal</h1>
          </Link>
        </div>
      </div>

      <div className="nav__icons">
        <Link to="/">
          <HomeIcon className="nav__home" />
        </Link>

        <Link to="/call-page">
          <CallIcon className="nav__call" />
        </Link>

        <Link to="/hospital-page">
          <LocalHospitalIcon className="nav__hospital" />
        </Link>
      </div>
    </div>
  );
}

export default MainNavigation;

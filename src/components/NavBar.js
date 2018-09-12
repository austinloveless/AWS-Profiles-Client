import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav>
      <div className="nav-wrapper">
        <Link to="/" className="brand-logo">
          Profiles
        </Link>
        <ul id="nav-mobile" className="right hide-on-med-and-down" />
      </div>
    </nav>
  );
};

export default NavBar;

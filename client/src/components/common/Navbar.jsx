import React from "react";
import { Link } from "react-router-dom";
import logo from "../../img/logo.png";
import LoginBtn from "../buttons/LoginBtn";

const Navbar = ({ showLogin = true }) => {
  return (
    <div className="flex justify-between items-center">
      <Link to="/">
        <img className="w-28" src={logo} alt="logo" />
      </Link>
      {showLogin && <LoginBtn />}
    </div>
  );
};

export default Navbar;

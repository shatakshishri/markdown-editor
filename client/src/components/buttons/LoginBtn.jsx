import React from "react";
import { Link } from "react-router-dom";

const LoginBtn = () => {
  return (
    <Link to="/auth" className="z-10">
      <button className="bg-[#E35F21] px-8 py-[0.35rem] rounded-3xl text-lg font-semibold hover:bg-[#e35e21d3] animation">
        Login
      </button>
    </Link>
  );
};

export default LoginBtn;

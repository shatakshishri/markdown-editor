import React from "react";
import { GoMarkdown } from "react-icons/go";
import { Link } from "react-router-dom";
import { myAuth } from "../../states";

const MdEditorBtn = () => {
  const user = myAuth((state) => state.auth.user);
  return (
    <Link
      to={
        user && user?.email
          ? `/editor?fileId=${Date.now().toString()}`
          : "/editor"
      }
    >
      <button className="flex items-center space-x-2 text-lg bg-[#E35F21] px-6 py-[0.35rem] rounded-3xl hover:bg-[#e35e21d3] animation">
        <GoMarkdown /> <span> Editor </span>
      </button>
    </Link>
  );
};

export default MdEditorBtn;

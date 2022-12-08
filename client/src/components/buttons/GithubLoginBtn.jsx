import React from "react";
import github from "../../img/github.png";
import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { auth as githubAuth } from "../../firebase";
import toast from "react-hot-toast";
import { loginFunc } from "../../functions/login";

const GithubLoginBtn = () => {
  const handleClick = () => {
    signInWithPopup(githubAuth, new GithubAuthProvider())
      .then((response) => {
        loginFunc(response,"github")
      })
      .catch((err) => {
        console.log(err);
        toast("Error Occured", {
          icon: "❌",
          style: {
            borderRadius: "10px",
            background: "#111",
            color: "#fff",
          },
        });
      });
  };
  return (
    <button
      className="bg-black flex items-center space-x-3 px-10 py-[0.5rem] rounded-3xl text-lg font-semibold BS"
      onClick={handleClick}
    >
      <img src={github} alt="github" className="w-6" />{" "}
      <span>Login with Github</span>
    </button>
  );
};

export default GithubLoginBtn;

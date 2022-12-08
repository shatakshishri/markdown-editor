import React from "react";
import google from "../../img/google.png";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth as googleAuth } from "../../firebase";
import toast from "react-hot-toast";
import { loginFunc } from "../../functions/login";

const GoogleLoginBtn = () => {
  const googleProvider = new GoogleAuthProvider();
  const handleClick = () => {
    signInWithPopup(googleAuth, googleProvider)
      .then((response) => {
        loginFunc(response,"google");
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
      <img src={google} alt="google" className="w-6" />{" "}
      <span>Login with Google</span>
    </button>
  );
};

export default GoogleLoginBtn;

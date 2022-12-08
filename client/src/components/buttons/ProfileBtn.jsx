import React, { useState } from "react";
import { logout } from "../../http";
import { myAuth } from "../../states";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const ProfileBtn = ( { dropDown = true}) => {
  const auth = myAuth((state) => state.auth);
  const navigate = useNavigate();
  const [flag, setFlag] = useState(false);
  return (
    <>
      <div className="cursor-pointer" onClick={() => setFlag(!flag)}>
        <img src={auth?.user?.avatar} className="w-10 h-10 rounded-full" />
      </div>
      {flag && dropDown && <DropDown auth={auth} navigate={navigate} />}
    </>
  );
};

const DropDown = ({ auth, navigate }) => {
  return (
    <div className="absolute right-[2vw] mt-[30vh] w-[250px] bg-black border border-[#444] rounded-md py-3">
      <p className="px-3 truncate cursor-pointer hover:bg-[#222] py-2">
        {auth?.user?.email}
      </p>
      <button
        className="px-3 w-full text-left cursor-pointer hover:bg-[#222] py-2"
        onClick={async () => {
          try {
            await logout();
            Cookies.remove("accessToken");
            Cookies.remove("refreshToken");
            navigate("/");
            window.location.reload();
          } catch (error) {
            console.log(error);
          }
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default ProfileBtn;

import toast from "react-hot-toast";
import { login } from "../http";
import  Cookies from 'js-cookie'

export const loginFunc = async (response,provider) => {
  const user = {
    displayName: response.user?.displayName,
    email: response.user?.email,
    // avatar: `https://avatars.dicebear.com/api/open-peeps/${
    //   response?.user?.email?.split("@")[0] || "placeholder"
    // }.svg`,
    avatar: response.user?.photoURL,
    provider,
  };
  try {
    const { data } = await login(user);
    Cookies.set('accessToken',data?.tokens?.at)
    Cookies.set('refreshToken',data?.tokens?.rt)
    window.location.reload();
  } catch (error) {
    toast("Error Occured", {
      icon: "❌",
      style: {
        borderRadius: "10px",
        background: "#111",
        color: "#fff",
      },
    });
    console.log(error);
  }
};

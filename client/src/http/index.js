import axios from "axios";
import Cookies from "js-cookie";

const at = Cookies.get("accessToken");
const rt = Cookies.get("refreshToken");

const url = process.env.REACT_APP_SERVER || "http://localhost:5000";

export const login = (data) => axios.post(`${url}/api/login`, data);
export const getFiles = () => axios.post(`${url}/api/get-file`, { at, rt });
export const renameFile = (data) =>
  axios.post(`${url}/api/rename-file`, { at, rt, ...data });
export const logout = () => axios.post(`${url}/api/logout`, { at, rt });

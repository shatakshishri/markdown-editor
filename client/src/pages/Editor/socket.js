import io from "socket.io-client";  

const SOCKET_URL = process.env.REACT_APP_SERVER || "http://localhost:5000"

export const socket = io(SOCKET_URL);
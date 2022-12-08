import React from "react";
import { useAuth } from "../../hooks/useAuth";
import { myAuth } from "../../states";
import Editor from "./Editor";
import WDS from './WDS'
import Editor1 from "./Editor1";
import Dev from "./Dev";

const Main = () => {
  const auth = myAuth((state) => state.auth);

  if (auth && auth?.isAuth) return <Dev />;
  return <Editor1 />;
};

export default Main;

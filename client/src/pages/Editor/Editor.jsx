import React, { useRef, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import EditorNavbar from "../../components/common/EditorNavbar";
import MDEditor from "@uiw/react-md-editor";
import { io } from "socket.io-client";

import { useAuth } from "../../hooks/useAuth";
import { myAuth } from "../../states";

const Editor = () => {
  const loading = useAuth();
  const auth = myAuth((state) => state.auth);
  const socket = useRef();
  const [value, setValue] = useState("");
  const [params,setParams] = useSearchParams()
  const [fileId, setFileId] = useState()
  const [lastEdited, setLastEdited] = useState()
  useEffect(() => {
    document.documentElement.setAttribute("data-color-mode", "dark");
  }, []);

  useEffect(() => {
    const id = params.get('fileId')
    setFileId(id)
    socket.current = io(
      process.env.REACT_APP_SERVER || "http://localhost:5000"
    );
    socket && socket.current && socket.current.emit('get-file',{
      fileId: id,
      userId: auth?.user?._id,
      data: value,
    })
    return () => {
      socket.current.disconnect();
    };
  }, []);

  useEffect(() => {
    if(!socket)return
    socket && socket.current && socket.current.on('send-file',data=> {
      setValue(data?.data)  
      setLastEdited(data?.updatedAt)
    })
  },[])

  useEffect(() => {
    if (!socket || !socket.current) return;
    socket && socket.current && socket.current.emit("send-changes", value);
    setLastEdited(Date.now())
  }, [value]);

  useEffect(() => {
    if (!socket || !socket.current) return;
    const handler = e=> setValue(e)
    socket &&
      socket.current &&
      socket.current.off("rec-changes",handler).on("rec-changes",handler);
  }, []);

  return (
    <div className="pt-4 px-8 scrollbar-hide bg-black text-white">
      <EditorNavbar lastEdited={lastEdited} value={value} />
      <div
        className="mt-3 scrollbar-hide"
        style={{ minHeight: "calc(100vh - 48px)" }}
      >
        <p className="my-4 text-lg font-semibold">Markdown Editor</p>
        <MDEditor value={value} onChange={setValue} autoFocus />
        <p className="my-4 text-lg font-semibold">Preview</p>
        <MDEditor.Markdown source={value} style={{ whiteSpace: "pre-wrap" }} />
      </div>
    </div>
  );
};

export default Editor;

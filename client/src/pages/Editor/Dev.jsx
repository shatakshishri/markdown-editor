import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import EditorNavbar from "../../components/common/EditorNavbar";
import Navbar from "../../components/common/Navbar";
import RingSpinner from "../../components/spinners/RingSpinner";
import MDEditor from "@uiw/react-md-editor";

import { myAuth } from "../../states";
import { io } from "socket.io-client";

const Dev = () => {
  const auth = myAuth((state) => state.auth);
  const [value, setValue] = useState("");
  const [params, setParams] = useSearchParams();
  const [socket, setSocket] = useState();
  const [fileId, setFileId] = useState();
  const [lastEdited, setLastEdited] = useState();
  const [fileName, setFileName] = useState();
  useEffect(() => {
    document.documentElement.setAttribute("data-color-mode", "dark");
    const id = params.get("fileId");
    setFileId(id);
    const s = io(process.env.REACT_APP_SERVER || "http://localhost:5000");
    setSocket(s);
    return () => {
      s.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!socket || !fileId || !auth) return;
    socket.emit("get-file", {
      fileId: fileId,
      userId: auth?.user?._id,
    });
    const fileHandler = (data) => {
      setValue(data?.data);
      setLastEdited(data?.updatedAt);
      setFileName(data?.name);
    };
    socket.on("send-file", fileHandler);
    return () => {
      socket.off("send-file", fileHandler);
    };
  }, [fileId]);

  useEffect(() => {
    if (!socket) return;

    const timer = setTimeout(() => {
      socket.emit("send-changes", { data: value, senderId: socket.id });
    }, 500);

    return () => clearTimeout(timer);
  }, [value]);

  useEffect(() => {
    if (!socket) return;
    const valueHandler = ({ data, senderId }) => {
      socket.id !== senderId && setValue(data);
    };
    socket.on("rec-changes", valueHandler);
    return () => {
      socket.off("rec-changes", valueHandler);
    };
  }, [socket]);

  if (fileId) {
    return (
      <div className="pt-4 px-2 sm:px-8 scrollbar-hide bg-black text-white">
        <EditorNavbar
          lastEdited={lastEdited}
          value={value}
          fileName={fileName}
          setFileName={setFileName}
          fileId={fileId}
        />
        <div
          className="mt-3 scrollbar-hide"
          style={{ minHeight: "calc(100vh - 48px)" }}
        >
          <p className="my-4 text-lg font-semibold">Markdown Editor</p>
          <MDEditor value={value} onChange={setValue} autoFocus />
          <p className="my-4 text-lg font-semibold">Preview</p>
          <MDEditor.Markdown
            source={value}
            style={{ whiteSpace: "pre-wrap" }}
          />
        </div>
      </div>
    );
  } else {
    return (
      <div className="bg-black text-white h-screen w-screen flex items-center flex-col">
        <div className="w-full">
          <Navbar showLogin={false} />
        </div>
        <RingSpinner />
        <p className="text-xl font-semibold -mt-5">Loading...</p>
      </div>
    );
  }
};

export default Dev;

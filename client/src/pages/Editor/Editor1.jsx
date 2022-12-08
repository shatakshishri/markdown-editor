import React, { useEffect, useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import EditorNavbar from "../../components/common/EditorNavbar";

const Editor1 = () => {
  const [value, setValue] = useState();
  useEffect(() => {
    setValue(localStorage.getItem("data"));
  }, []);
  useEffect(() => {
    if(!value)return
    localStorage.setItem("data", value);
  }, [value]);
  return (
    <div className="pt-4 px-2 sm:px-8 scrollbar-hide bg-black text-white">
      <EditorNavbar value={value} />
      <div
        className="mt-3 scrollbar-hide"
        style={{ minHeight: "calc(100vh - 48px)" }}
      >
        <p className="my-4 text-lg font-semibold">Markdown Editor</p>
        <MDEditor value={value} onChange={setValue} autoFocus className="h-[80vh]" />
        <p className="my-4 text-lg font-semibold block sm:hidden">Preview</p>
        <MDEditor.Markdown className="block sm:hidden" source={value} style={{ whiteSpace: "pre-wrap" }} />
      </div>
    </div>
  );
};

export default Editor1;

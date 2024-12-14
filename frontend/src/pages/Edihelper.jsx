import React from "react";
import Editor from "@monaco-editor/react";

const Edihelper = ({ lightMode , value }) => {
  return (
    <>
      <Editor
        height="90vh"
        defaultLanguage={value}
        defaultValue="// some comment"
        theme={lightMode ? "vs-dark" : "vs-light"} // Use lightMode prop to set theme
      />
    </>
  );
};

export default Edihelper;

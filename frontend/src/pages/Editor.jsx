import React, { useEffect, useState } from "react";
import EditorNav from "../components/EditorNav";
import { CiDark } from "react-icons/ci";
import { MdOutlineFullscreen } from "react-icons/md";
import CodeEditor from "@monaco-editor/react";
import "../App.css";
import { api_base_url } from "../helper";
import { useParams } from "react-router-dom";

const Editor = () => {
  const [lightMode, setLightMode] = useState(true); // Theme state
  const [isExpanded, setIsExpanded] = useState(false);
  const [tab, setTab] = useState("html");
  const [htmlCode, setHtmlCode] = useState("");
  const [cssCode, setCssCode] = useState("");
  const [jsCode, setJsCode] = useState("");

  let {projectId} = useParams();
  const run = () => {
    const html = htmlCode;
    const css = `<style>${cssCode}</style>`;
    const js = `<script>${jsCode}</script>`;
    const iframe = document.getElementById("iframe");

    if (iframe) {
      iframe.srcdoc = html + css + js;
    }
  };
  useEffect(() => {
    run();
  }, [htmlCode, cssCode, jsCode]); // Rerun iframe content on code changes

  useEffect(() => {
    fetch(api_base_url + "/getProject", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: localStorage.getItem("userId"),
        projectId: projectId // Use projectID here
      })
    })
      .then(res => res.json())
      .then(data => {
        setHtmlCode(data.project?.htmlCode || `<!doctype html>
          <html lang="en">
          <head>
              <meta charset="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <title>My Project</title>
          </head>
          <body>
              <!-- Your content goes here -->
          </body>
          </html>`);
            setCssCode(data.project?.cssCode || `body{ margin: 0; padding: 0; box-sizing: border-box; }`);
            setJsCode(data.project?.jsCode || `console.log("Hello!");`);
      });
  }, [projectId]);

  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === 's') {
        event.preventDefault(); 
        setIsSaving(true); // Start loading
        fetch(api_base_url + "/updateProject", {
          mode: "cors",
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            userId: localStorage.getItem("userId"),
            projectId: projectId,
            htmlCode: htmlCode,
            cssCode: cssCode,
            jsCode: jsCode
          })
        })
        .then(res => res.json())
        .then(data => {
          setIsSaving(false); // Stop loading
          if (data.success) {
            alert("Project saved successfully");
          } else {
            alert(data.message);
          }
        })
        .catch((err) => {
          setIsSaving(false); // Stop loading
          console.error("Error saving project:", err);
          alert("Failed to save project. Please try again.");
        });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [projectId, htmlCode, cssCode, jsCode]);

  const changeTheme = () => {
    setLightMode((prevMode) => !prevMode);
  };

  return (
    <div>
      <EditorNav />
      <div className="flex w-screen">
        {/* Left Section */}
        <div className={`left border-r-2  ${isExpanded ? "w-full" : "w-1/2"}`}>
          <div className="flex items-center justify-between gap-2 w-full bg-[#322626] h-[50px] px-[40px]">
            <div className="flex items-center gap-2">
              {["html", "css", "js"].map((item) => (
                <div
                  key={item}
                  onClick={() => setTab(item)}
                  className={`tab cursor-pointer p-[6px] px-[10px] text-[15px] ${
                    tab === item ? "bg-[#1E1E1E] text-white" : "bg-gray-700"
                  }`}
                >
                  {item}
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <CiDark
                className="text-[20px] cursor-pointer"
                onClick={changeTheme}
              />
              <MdOutlineFullscreen
                className="text-[20px] cursor-pointer"
                onClick={() => setIsExpanded(!isExpanded)}
              />
            </div>
          </div>

          {/* Code Editor */}
          {tab === "html" && (
            <CodeEditor
              onChange={(value) => setHtmlCode(value || "")}
              height="90vh"
              language="html"
              value={htmlCode}
              theme={lightMode ? "vs-dark" : "vs-light"}
            />
          )}
          {tab === "css" && (
            <CodeEditor
              onChange={(value) => setCssCode(value || "")}
              height="90vh"
              language="css"
              value={cssCode}
              theme={lightMode ? "vs-dark" : "vs-light"}
            />
          )}
          {tab === "js" && (
            <CodeEditor
              onChange={(value) => setJsCode(value || "")}
              height="90vh"
              language="javascript"
              value={jsCode}
              theme={lightMode ? "vs-dark" : "vs-light"}
            />
          )}
        </div>

        {/* Right Section */}
        <iframe
          id="iframe"
          className={`${
            isExpanded ? "hidden" : "block"
          } w-1/2 bg-white min-h-[100vh] text-black`}
        ></iframe>
      </div>
    </div>
  );
};

export default Editor;

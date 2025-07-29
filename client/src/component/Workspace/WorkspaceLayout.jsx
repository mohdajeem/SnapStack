// components/Workspace/WorkspaceLayout.jsx
import React, { useState, useRef, useEffect, useCallback } from "react";
import { SandpackProvider, SandpackCodeEditor, SandpackPreview, useSandpack } from "@codesandbox/sandpack-react";
import { githubLight } from "@codesandbox/sandpack-themes";
import PromptSider from "../PromptSider/PromptSider";
import "./Workspace.css";

import JSZip from 'jszip';
import {saveAs} from 'file-saver';

const CodeUpdateListener = ({ onCodeChange }) => {
  const { sandpack } = useSandpack();
  const { files, activeFile } = sandpack;

  useEffect(() => {
    const fileType = activeFile === '/styles.css' ? 'css' : 'jsx';
    onCodeChange(files[activeFile].code, fileType);
  }, [files, activeFile, onCodeChange]);

  return null;
};

const WorkspaceLayout = ({
  jsxCode,
  cssCode,
  setJsxCode,
  setCssCode,
  chatHistory,
  setChatHistory,
  isAiResponding,
  handleAiRequest,
  sessionId,
  handleSaveCode,
}) => {
  const [activeView, setActiveView] = useState("code");
  const workspaceKey = `${sessionId || "new"}-${btoa(jsxCode + cssCode).slice(0, 10)}`;

  const latestJsx = useRef(jsxCode);
  const latestCss = useRef(cssCode);
  useEffect(() => { latestJsx.current = jsxCode; }, [jsxCode]);
  useEffect(() => { latestCss.current = cssCode; }, [cssCode]);

  const handleCodeChange = useCallback((code, fileType) => {
    if (fileType === "jsx") setJsxCode(code);
    else setCssCode(code);
  }, [setJsxCode, setCssCode]);


  const exportAllCode = async() => {
    try{
      const zip = new JSZip();
      zip.file('App.js', latestJsx.current);
      zip.file('style.css', latestCss.current);
      zip.file('index.js',`
              import React from "react";
              import { createRoot } from "react-dom/client";
              import App from "./App";
              import "./styles.css";

              const container = document.getElementById("root");
              const root = createRoot(container);
              root.render(<App />);
              `.trim()
      );

      const content = await zip.generateAsync({ type: "blob" });
      saveAs(content, 'snapstack-export.zip');

    } catch(err){
      console.log("Export problem", err);
    }
  }


  return (
    <div className="workspace-wrapper">
      <PromptSider
        chatHistory={chatHistory}
        handleAiRequest={handleAiRequest}
        isAiResponding={isAiResponding}
      />
      <div className="workspace-main-content">
        <SandpackProvider
          template="react"
          theme={githubLight}
          key={workspaceKey}
          files={{
            "/App.js": jsxCode,
            "/styles.css": cssCode,
            "/index.js": {
              code: `
              import React from "react";
              import { createRoot } from "react-dom/client";
              import App from "./App";
              import "./styles.css";

              const container = document.getElementById("root");
              const root = createRoot(container);
              root.render(<App />);
              `.trim(),
              hidden: true,
            },
          }}
          options={{ autorun: true }}
        >
          <div className="view-tabs">
            <button className={`tab-button ${activeView === "code" ? "active" : ""}`} onClick={() => setActiveView("code")}>Code</button>
            <button className={`tab-button ${activeView === "preview" ? "active" : ""}`} onClick={() => setActiveView("preview")}>Preview</button>
            <button onClick={handleSaveCode}>Save Edit</button>
            <button onClick={exportAllCode}>Export Code</button>
          </div>
          <div className="view-content">
            <div style={{ display: activeView === "code" ? "block" : "none", height: "100%" }}>
              <SandpackCodeEditor showTabs style={{ height: "100%", width: "100%" }} />
            </div>
            <div style={{ display: activeView === "preview" ? "block" : "none", height: "100%" }}>
              <SandpackPreview style={{ height: "100%", width: "100%" }} />
            </div>
          </div>
          <CodeUpdateListener onCodeChange={handleCodeChange} />
        </SandpackProvider>
      </div>
    </div>
  );
};

export default WorkspaceLayout;

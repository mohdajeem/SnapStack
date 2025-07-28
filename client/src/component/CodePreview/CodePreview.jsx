import React from 'react';
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  useSandpack
} from "@codesandbox/sandpack-react";
import { githubLight } from "@codesandbox/sandpack-themes";

function CodeUpdateListener({ onCodeChange }) {
  const { sandpack } = useSandpack();

  return (
    <>
      <SandpackCodeEditor
        showTabs
        closableTabs
        style={{ height: '100%' }}
        onCodeUpdate={(updatedCode) => {
          const activePath = sandpack.activePath;
          if (activePath === "/App.js") {
            onCodeChange(updatedCode, 'jsx');
          } else if (activePath === "/styles.css") {
            onCodeChange(updatedCode, 'css');
          }
        }}
      />
    </>
  );
}

const CodePreview = ({ jsxCode, cssCode, onCodeChange, sessionId }) => {
  const files = {
    "/App.js": { code: jsxCode },
    "/styles.css": { code: cssCode },
    "/index.js": {
      code: `import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles.css";

const root = createRoot(document.getElementById("root"));
root.render(<App />);`,
      hidden: true,
    },
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <SandpackProvider
        template="react"
        theme={githubLight}
        files={files}
        key={sessionId || "new"}
      >
        <SandpackLayout style={{ height: "100%" }}>
          {/* Editor with update listener */}
          <CodeUpdateListener onCodeChange={onCodeChange} />
          <SandpackPreview style={{ height: "100%" }} />
        </SandpackLayout>
      </SandpackProvider>
    </div>
  );
};

export default CodePreview;

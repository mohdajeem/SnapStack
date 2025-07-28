// components/Workspace/NewWorkspace.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createOrUpdateSession } from "../../services/sessionService";
import WorkspaceLayout from "./WorkspaceLayout";

const NewWorkspace = () => {
  const navigate = useNavigate();

  const [jsxCode, setJsxCode] = useState(`export default function App() {\n  return <h1>Welcome! Enter a prompt to start.</h1>\n}`);
  const [cssCode, setCssCode] = useState(`body { font-family: sans-serif; }`);
  const [chatHistory, setChatHistory] = useState([]);
  const [isAiResponding, setIsAiResponding] = useState(false);

  const handleAiRequest = async (userPrompt) => {
    if (!userPrompt.trim()) return;
    setIsAiResponding(true);
    setChatHistory((prev) => [...prev, { role: "user", content: userPrompt }]);
    try {
      const response = await createOrUpdateSession(userPrompt);
      if (response.success) {
        const { session } = response;
        setJsxCode(session.jsxCode);
        setCssCode(session.cssCode);
        setChatHistory(session.chatHistory);
        navigate(`/workspace/${session._id}`, { replace: true });
      }
    } catch (err) {
      setChatHistory((prev) => [...prev, { role: "assistant", content: `Error: ${err.message}` }]);
    } finally {
      setIsAiResponding(false);
    }
  };

  const handleSaveCode = () => {
    // No save for new session yet
  };

  return (
    <WorkspaceLayout
      jsxCode={jsxCode}
      cssCode={cssCode}
      setJsxCode={setJsxCode}
      setCssCode={setCssCode}
      chatHistory={chatHistory}
      setChatHistory={setChatHistory}
      isAiResponding={isAiResponding}
      handleAiRequest={handleAiRequest}
      handleSaveCode={handleSaveCode}
      sessionId={null}
    />
  );
};

export default NewWorkspace;

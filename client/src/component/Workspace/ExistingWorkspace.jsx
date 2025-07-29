// components/Workspace/ExistingWorkspace.jsx
import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSessionById, createOrUpdateSession, updateSessionCode } from "../../services/sessionService";
import WorkspaceLayout from "./WorkspaceLayout";

const ExistingWorkspace = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();

  const [jsxCode, setJsxCode] = useState("");
  const [cssCode, setCssCode] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAiResponding, setIsAiResponding] = useState(false);

  const latestJsx = useRef(jsxCode);
  const latestCss = useRef(cssCode);
  useEffect(() => { latestJsx.current = jsxCode }, [jsxCode]);
  useEffect(() => { latestCss.current = cssCode }, [cssCode]);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await getSessionById(sessionId);
        if (response.success) {
          const { data } = response;
          setJsxCode(data.jsxCode);
          setCssCode(data.cssCode);
          setChatHistory(data.chatHistory);
        } else {
          navigate("/dashboard");
        }
      } catch {
        navigate("/dashboard");
      } finally {
        setIsLoading(false);
      }
    };
    fetchSession();
  }, [sessionId, navigate]);

  const handleAiRequest = async (userPrompt) => {
    if (!userPrompt.trim()) return;
    setIsAiResponding(true);
    setChatHistory((prev) => [...prev, { role: "user", content: userPrompt }]);
    try {
      const response = await createOrUpdateSession(userPrompt, sessionId);
      if (response.success) {
        const { session } = response;
        setJsxCode(session.jsxCode);
        setCssCode(session.cssCode);
        setChatHistory(session.chatHistory);
      }
    } catch (err) {
      setChatHistory((prev) => [...prev, { role: "assistant", content: `Error: ${err.message}` }]);
    } finally {
      setIsAiResponding(false);
    }
  };

  const handleSaveCode = async () => {
    try {
      const payload = { jsxCode: latestJsx.current, cssCode: latestCss.current };
      const resp = await updateSessionCode(sessionId, payload);
      // console.log(resp);
    } catch (err) {
      console.error("Save failed", err);
    }
  };

  if (isLoading) return <div className="page-status"><h2>Loading Workspace...</h2></div>;

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
      sessionId={sessionId}
    />
  );
};

export default ExistingWorkspace;

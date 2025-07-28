import React, { useState, useEffect, useRef } from 'react';
import './PromptSider.css';

const PromptSider = ({ chatHistory, handleAiRequest, isAiResponding }) => {
    const [currentPrompt, setCurrentPrompt] = useState('');
    const chatEndRef = useRef(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatHistory]);

    const handleSubmit = (e) => {
        e.preventDefault();
        handleAiRequest(currentPrompt);
        setCurrentPrompt('');
    };

    const renderMessageContent = (message) => {
        try {
            JSON.parse(message.content);
            return <p><i>AI generated new code. See the preview!</i></p>;
        } catch (e) {
            return <p>{message.content}</p>;
        }
    };

    return (
        <div className="sidebar-container">
            <div className="chat-history">
                {chatHistory.length === 0 && (
                    <div className="chat-message assistant">
                        <p>Welcome! Describe the component you want to build.</p>
                    </div>
                )}
                {chatHistory.map((message, index) => (
                    <div key={index} className={`chat-message ${message.role}`}>
                        {renderMessageContent(message)}
                    </div>
                ))}
                {isAiResponding && (
                    <div className="chat-message assistant">
                        <p className="typing-indicator">AI is thinking...</p>
                    </div>
                )}
                <div ref={chatEndRef} />
            </div>
            <form onSubmit={handleSubmit} className="prompt-form">
                <textarea
                    value={currentPrompt}
                    onChange={(e) => setCurrentPrompt(e.target.value)}
                    placeholder="e.g., A login form with a blue button"
                    rows={4}
                    disabled={isAiResponding}
                />
                <button type="submit" disabled={isAiResponding || !currentPrompt.trim()}>
                    {isAiResponding ? '...' : 'Send'}
                </button>
            </form>
        </div>
    );
};

export default PromptSider;
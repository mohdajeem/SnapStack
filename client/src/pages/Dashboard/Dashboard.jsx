import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getAllSessions } from '../../services/sessionService';
import './Dashboard.css';

const Dashboard = () => {
    const [sessions, setSessions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSessions = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await getAllSessions();
                if (response.success) {
                    // Sort sessions by most recently updated
                    const sortedSessions = response.data.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
                    setSessions(sortedSessions);
                } else {
                    setError("Could not fetch sessions.");
                }
            } catch (err) {
                console.error("Dashboard fetch error:", err);
                setError(err.message || "An error occurred while fetching your sessions.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchSessions();
    }, []);

    if (isLoading) {
        return <div className="page-status"><h2>Loading sessions...</h2></div>;
    }

    if (error) {
        return <div className="page-status">
            <h2>Something Went Wrong</h2>
            <p>{error}</p>
        </div>;
    }

    return (
        <div className="dashboard">
            <header className="dashboard-header">
                <h1>My Sessions</h1>
                <Link to="/workspace" className="cta-button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                    New Workspace
                </Link>
            </header>

            {sessions.length > 0 ? (
                <div className="sessions-grid">
                    {sessions.map(session => (
                        <div key={session._id} className="session-card" onClick={() => navigate(`/workspace/${session._id}`)}>
                            <h3>{session.title || 'Untitled Session'}</h3>
                            <p>
                                {session.chatHistory && session.chatHistory.length > 0
                                    ? `Last prompt: "${session.chatHistory[0].content}"`
                                    : 'No prompt yet. Click to start the conversation!'}
                            </p>
                            <small>Updated: {new Date(session.updatedAt).toLocaleString()}</small>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="page-status">
                    <h2>No Sessions Found</h2>
                    <p>You haven't created any workspaces yet. Click the button above to get started!</p>
                </div>
            )}
        </div>
    );
}

export default Dashboard;

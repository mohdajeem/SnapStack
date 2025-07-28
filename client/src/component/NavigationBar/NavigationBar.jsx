import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate, NavLink } from 'react-router-dom';
import './NavigationBar.css';

const NavigationBar = () => {
    const { isAuthenticated, user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    // This function helps NavLink apply a class for the active link
    const getNavLinkClass = ({ isActive }) => {
        return isActive ? 'nav-link active' : 'nav-link';
    };

    return (
        <nav className='navbar'>
            <div className='navbar-left'>
                <Link to={isAuthenticated ? '/dashboard' : '/'} className='logo'>
                    SnapStack
                </Link>
                {isAuthenticated && (
                    <div className='nav-links'>
                        <NavLink to='/workspace' className={getNavLinkClass}>New Workspace</NavLink>
                        <NavLink to='/dashboard' className={getNavLinkClass}>My Sessions</NavLink>
                    </div>
                )}
            </div>
            <div className='navbar-right'>
                {isAuthenticated && user ? (
                    <div className='user-profile'>
                        <span>Welcome, {user.username}</span>
                        <button onClick={handleLogout} className="logout-button">Logout</button>
                    </div>
                ) : (
                    // This section is likely not needed if the navbar is only shown when logged in,
                    // but is kept here for completeness.
                    <div className='nav-links'>
                        <NavLink to="/login" className='nav-link'>Login</NavLink>
                        <NavLink to="/register" className='nav-link'>Sign Up</NavLink>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default NavigationBar;
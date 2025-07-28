import React from 'react';
import { Outlet } from 'react-router-dom';
import NavigationBar from './NavigationBar/NavigationBar.jsx';
import './MainLayout.css'; // Import the new stylesheet

const MainLayout = () => {
    return (
        <div className="main-layout">
            <NavigationBar />
            <main className="main-content">
                <Outlet />
            </main>
        </div>
    );
};

export default MainLayout;
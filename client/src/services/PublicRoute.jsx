// services/PublicRoute.jsx
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';

const PublicRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  // If user is logged in and trying to access login or home, send to dashboard
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default PublicRoute;

import React from "react";
import { Route, Routes } from 'react-router-dom';
import ProtectedRoutes from "./services/ProtectedRoutes.jsx";
import PublicRoute from "./services/PublicRoute.jsx";
import MainLayout from "./component/MainLayout.jsx";

import Login from './pages/Login/Login.jsx';
import Register from './pages/Register/Register.jsx';
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import NewWorkspace from "./component/Workspace/NewWorkspace.jsx";
import ExistingWorkspace from "./component/Workspace/ExistingWorkspace.jsx";
import NotFound from "./pages/NotFound.jsx";
import HomePage from './pages/Home/HomePage.jsx';

function App() {
  return (
    <Routes>
      {/* Home page: Public for everyone */}
      <Route path="/" element={<HomePage />} />

      {/* unAuthorised access */}
      <Route 
        path="/login" 
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } 
      />
      <Route 
        path="/register" 
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        } 
      />

      {/* Protected Routes */}
      <Route element={<ProtectedRoutes />}>
        <Route element={<MainLayout />}>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path="/workspace" element={<NewWorkspace />} />
          <Route path="/workspace/:sessionId" element={<ExistingWorkspace />} />
        </Route>
      </Route>

      {/* Catch all */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;

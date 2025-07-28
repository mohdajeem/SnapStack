// import { Navigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// const ProtectedRoutes = ({children}) => {
//     const {token} = useAuth();
//     return token ? children : <Navigate to="/login" />
// }

// export default ProtectedRoutes;

// import React from 'react';
// import { Navigate, Outlet } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// const ProtectedRoutes = () => {
//     const { isAuthenticated, isLoading } = useAuth();

//     // 1. While the AuthContext is verifying the token, isLoading will be true.
//     // We should show a loading indicator to prevent a "flicker" where the user
//     // is briefly redirected to /login even if they have a valid token.
//     if (isLoading) {
//         // You can replace this with a nice, centered spinner component
//         return (
//             <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
//                 <h2>Loading Application...</h2>
//             </div>
//         );
//     }

//     // 2. Once the loading is finished, we check if the user is authenticated.
//     // If they are, we render the nested child routes using the <Outlet /> component.
//     // If they are not, we redirect them to the login page.
//     return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
// };

// export default ProtectedRoutes;


import React from 'react';
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoutes = () => {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <h2>Loading Application...</h2>
        </div>;
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoutes;
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    console.log(isAuthenticated);

    if (!isAuthenticated) {
        // If not authenticated, redirect to the sign-in page
        return <Navigate to="/signIn" />;
    }

    // If authenticated, render the children (MyPage component in your case)
    return children;
};

export default ProtectedRoute;
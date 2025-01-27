import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { loginState } from '../../Atoms/atoms';

const ProtectedRoute = ({ redirectTo = '/' }) => {
    const isAuthenticated = useRecoilValue(loginState); // Or any other state management tool

    return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} />;
};

export default ProtectedRoute;

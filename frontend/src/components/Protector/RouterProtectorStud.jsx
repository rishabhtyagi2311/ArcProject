
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { loginState,UserAuthDetails } from '../../Atoms/atoms';

const ProtectedRouteStud = ({redirectTo = '/'}) => {

    let isAuthenticated = useRecoilValue(loginState)
    const AuthDetails = useRecoilValue(UserAuthDetails)
    if(AuthDetails.role !=='stud')
        {
            isAuthenticated = false
        }
return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} />;


}
export default ProtectedRouteStud
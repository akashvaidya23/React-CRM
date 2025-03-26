import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';

const WithAuthRedirect = (WrappedComponent) => {
    const AuthRedirect = (props) => {
        const navigate = useNavigate();
        const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
        console.log(isLoggedIn);
        useEffect(() => {
            if (isLoggedIn) {
                navigate('/dashboard');
            }
        }, [isLoggedIn, navigate]);
        console.log("Hey");
        return !isLoggedIn ? <WrappedComponent {...props} /> : null;
    };

    return AuthRedirect;
};

export default WithAuthRedirect;
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { getUser } from "../../auth/user";
import { useDispatch } from "react-redux";
import { handleLogout } from "../../features/user/userSlice";

const WithAuth = (WrappedComponent, { requiresAuth = false, shouldRedirectIfAuth = false } = {}) => {
    return (props) => {
        const dispatch = useDispatch();
        const navigate = useNavigate();
        const location = useLocation();
        const storedUserId = localStorage.getItem("user_id");
        const [userId, setUserId] = useState(storedUserId);
        const [isAuthenticated, setIsAuthenticated] = useState(false);
        const [authChecked, setAuthChecked] = useState(false);

        useEffect(() => {
            const checkAuth = async () => {
                if (userId) {
                    const user = await getUser(userId);
                    setIsAuthenticated(user.success);
                }
                setAuthChecked(true);
                sessionStorage.setItem("redirectAfterLogin", location.pathname);
            };
            checkAuth();
        }, [userId]);

        useEffect(() => {
            if (!authChecked) return;

            if (requiresAuth && !isAuthenticated) {
                sessionStorage.setItem("redirectAfterLogin", location.pathname);
                dispatch(handleLogout());
                navigate("/login");
            } 
            else if (shouldRedirectIfAuth && isAuthenticated) {
                const redirectUrl = sessionStorage.getItem("redirectAfterLogin");
                // console.log(redirectUrl);
                sessionStorage.removeItem("redirectAfterLogin"); // Clear after use
                navigate(redirectUrl);
            }
        }, [isAuthenticated, navigate, requiresAuth, shouldRedirectIfAuth, authChecked]);

        if (!authChecked || (requiresAuth && !isAuthenticated) || (shouldRedirectIfAuth && isAuthenticated)) {
            return null;
        }
        
        return <WrappedComponent {...props} />;
    };
};

export default WithAuth;

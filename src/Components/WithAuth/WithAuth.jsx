/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getUser } from "../../auth/user";
import { useDispatch } from "react-redux";
import { handleLogout } from "../../features/user/userSlice";

const WithAuth = (WrappedComponent, { requiresAuth = false, shouldRedirectIfAuth = false } = {}) => {
    return (props) => {
        const dispatch = useDispatch();
        const navigate = useNavigate();
        const storedUserId = localStorage.getItem("user_id");
        const [userId, setUserId] = useState(storedUserId);
        const [isAuthenticated, setIsAuthenticated] = useState(false);
        const [authChecked, setAuthChecked] = useState(false); // Prevents unnecessary re-renders

        useEffect(() => {
            const checkAuth = async () => {
                if (userId) {
                    const user = await getUser(userId);
                    setIsAuthenticated(user.success);
                }
                setAuthChecked(true);
            };
            checkAuth();
        }, [userId]);

        useEffect(() => {
            if (!authChecked) return;
            if (requiresAuth && !isAuthenticated) {
                dispatch(handleLogout());
                navigate("/login");
            } else if (shouldRedirectIfAuth && isAuthenticated) {
                console.log('dashboard ko redirect ');
                navigate("/dashboard");
            }
        }, [isAuthenticated, navigate, requiresAuth, shouldRedirectIfAuth, authChecked]);

        if (!authChecked || (requiresAuth && !isAuthenticated) || (shouldRedirectIfAuth && isAuthenticated)) {
            return null;
        }

        return <WrappedComponent {...props} />;
    };
};
export default WithAuth;

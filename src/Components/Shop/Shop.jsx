import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router";
import { handleLogout } from "../../features/user/userSlice";
import { logout } from "../../auth/user";
import { useCookies } from "react-cookie";
import { useEffect } from "react";

const Shop = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [cookies, setCookie, removeCookie] = useCookies(['accessToken'], {
        doNotParse: true,
    });

    useEffect(() => {
        console.log(cookies);
    },[cookies]);

    const logoutHandle = async () => {
        await logout();
        dispatch(handleLogout());
        navigate("/login");
    }

    return (
        <div>
            <h1>Shop</h1>
            <p>Welcome to the shop!</p>
            <Link onClick={logoutHandle} to="#" style={{ textDecoration: 'none', color: 'black', cursor: "pointer" }}>Logout</Link>
        </div>
    );
}
export default Shop;
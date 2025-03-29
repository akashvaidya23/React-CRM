import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router"
import { handleLogout } from "../../features/user/userSlice";

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const selector = useSelector((state) => state);
    const currentUser = selector.login.user_id;
    
    const logoutHandle = () => {
        dispatch(handleLogout());
        navigate("/login");
    }
    return (
        <>
            <nav style={{display: 'flex', flexDirection: 'row', gap:"20px", backgroundColor: 'blue', padding: '10px', height: '30px', alignItems: 'center'}}>
                <Link style={{textDecoration:'none', color:'white', fontWeight:'bold', fontSize:"20px"}} to="/">Home</Link>
                {currentUser ? <>
                        <Link style={{textDecoration:'none', color:'white'}}>Products</Link>
                        <Link style={{textDecoration:'none', color:'white'}}>Customers</Link>
                        <Link style={{textDecoration:'none', color:'white'}}>POS</Link>
                        <Link onClick={logoutHandle} to="#" style={{textDecoration:'none', color:'white', cursor:"pointer"}}>Logout</Link>
                    </> : <>
                        <Link style={{textDecoration:'none', color:'white'}} to="/login">Login</Link>
                        <Link style={{textDecoration:'none', color:'white'}} to="/signup">Sign Up</Link>
                    </>
                }
            </nav>
            <Outlet/>
        </>
    )
}

export default Navbar;
import { Link, Outlet } from "react-router"

const Navbar = () => {
    return (
        <>
            <nav style={{display: 'flex', flexDirection: 'row', gap:"20px", backgroundColor: 'blue', padding: '10px', height: '30px', alignItems: 'center'}}>
                <Link style={{textDecoration:'none', color:'white', fontWeight:'bold', fontSize:"20px"}} to="/">Home</Link>
                <Link style={{textDecoration:'none', color:'white'}} to="/login">Login</Link>
                <Link style={{textDecoration:'none', color:'white'}} to="/signup">Sign Up</Link>
                <Link style={{textDecoration:'none', color:'white'}}>Products</Link>
                <Link style={{textDecoration:'none', color:'white'}}>Customers</Link>
                <Link style={{textDecoration:'none', color:'white'}}>POS</Link>
            </nav>
            <Outlet/>
        </>
    )
}

export default Navbar;
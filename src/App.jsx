import { createBrowserRouter, RouterProvider } from "react-router";
import Login from "./Components/Login/Login";
import SignUp from './Components/SignUp/Signup.jsx';
import Homepage from './Components/HomePage/Homepage.jsx';
import Navbar from './Components/Navbar/Navbar.jsx';
import Dashboard from './Components/Dashboard/Dashboard.jsx';
import WithAuth from "./Components/withAuth/withAuth.jsx";

const ProtectedDashboard = WithAuth(Dashboard, { requiresAuth: true });
const ProtectedHomePage = WithAuth(Homepage, { shouldRedirectIfAuth: true, requiresAuth: true });

const PublicLogin = WithAuth(Login, { shouldRedirectIfAuth: true });
const PublicSignUp = WithAuth(SignUp, { shouldRedirectIfAuth: true });

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    children: [
      { path: "/", element: <ProtectedHomePage /> },
      { path: "/login", element: <PublicLogin /> },
      { path: "/signup", element: <PublicSignUp /> },
      { path: "/dashboard", element: <ProtectedDashboard /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
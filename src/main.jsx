import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router";
import Login from './Components/Login/Login.jsx';
import SignUp from './Components/SignUp/Signup.jsx';
import Homepage from './Components/HomePage/Homepage.jsx';
import Navbar from './Components/Navbar/Navbar.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar/>,
    children: [
      {
        path: "/",
        element: <Homepage/>,
      },
      {
        path: "/login",
        element: <Login/> ,
      },
      {
        path: "/signup",
        element: <SignUp/>,
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)

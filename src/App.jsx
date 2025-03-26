import { createBrowserRouter, RouterProvider } from "react-router";
import Login from "./Components/Login/Login";
import SignUp from './Components/SignUp/Signup.jsx';
import Homepage from './Components/HomePage/Homepage.jsx';
import Navbar from './Components/Navbar/Navbar.jsx';
import Dashbaord from './Components/Dashboard/Dashboard.jsx';
import WithAuthRedirect from "./Components/withAuthRedirect/withAuthRedirect.jsx";

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
        // element: (
        //   <WithAuthRedirect>
        //     <Login />
        //   </WithAuthRedirect>
        // )
      },
      {
        path: "/signup",
        element: <SignUp/>,
      }, 
      {
        path:"/dashboard",
        element: <Dashbaord/>
      }
    ]
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App

import {
  createBrowserRouter,
 } from "react-router-dom";
import Main from "./Main";
import Home from "../Pages/Homes/Home/Home";
import Login from "../Pages/login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import InstDashboard from "../Pages/Dashboard/InstructorDashboard/AddClass";
import Dashboard from "./Dashboard";
import AddClass from "../Pages/Dashboard/InstructorDashboard/AddClass";
import Classes from "../Pages/Classes/Classes";
import PrivateRoutes from "../Pages/Provider/PrivateRoutes";
import AllUsers from "../Pages/Dashboard/AllUsers";
import ManageClasses from "../Pages/Dashboard/AdminDashboard/ManageClasses";
import Instructor from "../Pages/Homes/Instructor/Instructor";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children:[
      {
        path:'/',
        element:<Home></Home>
      },
      {
        path:'classes',
        element:<Classes></Classes>
      },
      {
        path:'instructor',
        element:<Instructor></Instructor>
      },
      {
        path:'login',
        element:<Login></Login>
      },
      {
        path:'signup',
        element:<SignUp></SignUp>
      },
      
    ]
   
  },
  {
    path:'dashboard',
    element:<PrivateRoutes><Dashboard></Dashboard></PrivateRoutes>,
    children:[
      {
        path:'alluser',
        element:<AllUsers></AllUsers>
      },
      {
        path:'manageclass',
        element:<ManageClasses></ManageClasses>
      },
      {
        path:'addclass',
        element:<AddClass></AddClass>
      }
    ]
  }
]);

export default router;
import {
  createBrowserRouter,
 } from "react-router-dom";
import Main from "./Main";
import Home from "../Pages/Homes/Home/Home";
import Login from "../Pages/login/Login";
import SignUp from "../Pages/SignUp/SignUp";

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
        path:'login',
        element:<Login></Login>
      },
      {
        path:'signup',
        element:<SignUp></SignUp>
      }
    ]
  },
]);

export default router;
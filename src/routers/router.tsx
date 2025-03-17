import { createBrowserRouter } from "react-router";
import LoginPage from "@pages/auth/Login/Login.Page";
import RegisterPage from "../pages/auth/Register/Register.Page";
import HomePage from "../pages/home/Home.Page";
import NotFoundPage from "@pages/error/NotFound.Page";
import LayoutPage from "../pages/layout/Layout.Page";
import LayoutUser from "@/pages/layout/user/Layout.User";
import Terms from "@/pages/Terms/Terms";
import Policies from "@/pages/Policies/Policies";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutPage/>,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: '/',
        element: <LayoutUser/>,
        children: [
          {
            path: "/login",
            element: <LoginPage />,
            
          },
          {
            path: "/register",
            element: <RegisterPage />
          },
          {
            path: "/terms",
            element: <Terms />,
            
          },
          {
            path: "/policies",
            element: <Policies />
          },
        ]
      }
    ]
  },

  {
    path: "/admin",
  },

  {
    path: "*",
    element: <NotFoundPage />
  }
]);


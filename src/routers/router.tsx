import { createBrowserRouter } from "react-router";
import LoginPage from "@pages/auth/Login.Page";
import RegisterPage from "../pages/auth/Register.Page";
import HomePage from "../pages/home/Home.Page";
import NotFoundPage from "@pages/error/NotFound.Page";
import LayoutPage from "../pages/layout/Layout.Page";
import LayoutUser from "@/pages/layout/user/Layout.User";

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


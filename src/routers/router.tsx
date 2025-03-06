import { createBrowserRouter } from "react-router";
import LoginPage from "@pages/auth/Login.Page";
import RegisterPage from "../pages/auth/Register.Page";
import HomePage from "../pages/home/Home.Page";
import NotFoundPage from "@pages/error/NotFound.Page";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/register",
    element: <RegisterPage />
  },
  {
    path: "/",
    children: [
      {
        index: true,
        element: <HomePage />
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


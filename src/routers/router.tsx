import { createBrowserRouter } from "react-router";
import LoginPage from "@pages/auth/Login/Login.Page";
import RegisterPage from "../pages/auth/Register/Register.Page";
import HomePage from "../pages/home/Home.Page";
import NotFoundPage from "@pages/error/NotFound.Page";
import LayoutPage from "../pages/layout/Layout.Page";
import LayoutUser from "@/pages/layout/user/Layout.User";
import Terms from "@/pages/Terms/Terms";
import Policies from "@/pages/Policies/Policies";
import { routerConfig } from "@/configs/router.config";
import AuthAdmin from "@/components/AuthAdmin/AuthAdmin";
import PersistantLogin from "@/middlewares/PersistantLogin/PersistantLogin";
import UserProfile from "@/pages/user/UserProfile/UserProfile";
import CartPage from "@/pages/user/Cart/CartPage";
import ChangePasswordPage from "@/pages/user/ChangePassword/ChangePassword.Page";
import CheckoutPage from "@/pages/user/Checkout/Checkout.Page";

export const router = createBrowserRouter([
  {
    path: routerConfig.homePage,
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
            path: routerConfig.login,
            element: <LoginPage />,
            
          },
          {
            path: routerConfig.register,
            element: <RegisterPage />
          },
          {
            path: routerConfig.terms,
            element: <Terms />,
            
          },
          {
            path: routerConfig.userPolicy,
            element: <Policies />
          },
        ]
      },
      {
        path: '/',
        element: <LayoutUser/>,
        children: [
          {
            path: routerConfig.admin.path,
            element: <AuthAdmin/>,
          
          },
          {
            path: routerConfig.authenticate.user.userProfile,
            element: <UserProfile/>
          },
          {
            path: routerConfig.authenticate.user.carts,
            element: <CartPage/>
          },
          {
            path: routerConfig.authenticate.user.changePassword,
            element: <ChangePasswordPage/>
          },
          {
            path: routerConfig.authenticate.user.checkout,
            element: <CheckoutPage/>
          },
        ]
      }
    ]
  },

  {
    path: "*",
    element: <NotFoundPage />
  }
]);


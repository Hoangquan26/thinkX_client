import './App.css'
import React, { lazy } from 'react';
import LayoutPage from '@/pages/layout/Layout.Page';
import { BrowserRouter, Route, Router, Routes } from 'react-router';
import HomePage from '@/pages/home/Home.Page';
import LayoutUser from '@/pages/layout/user/Layout.User';
import { routerConfig } from '@/configs/router.config';
import LoginPage from '@/pages/auth/Login/Login.Page';
import RegisterPage from '@/pages/auth/Register/Register.Page';
import Terms from '@/pages/Terms/Terms';
import Policies from '@/pages/Policies/Policies';
import Course from '@/pages/course/Course';
import CourseDetail from '@/pages/CourseDetail/CourseDetail';
import CartPage from './pages/user/Cart/CartPage';
import CheckoutPage from './pages/user/Checkout/Checkout.Page';
import NotFoundPage from './pages/error/NotFound.Page';
import UnauthorizationLogin from './middlewares/UnauthorizationLogin/UnauthorizationLogin';
import ProtectedRoute from './middlewares/ProtectedRoute/ProtectedRoute';
import FullLayout from './admin/layouts/full/FullLayout';
import BlankLayout from './admin/layouts/blank/BlankLayout';
import Loadable from './admin/layouts/full/shared/loadable/Loadable';



/*


const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));

// Dashboard
const Dashboard = Loadable(lazy(() => import('../views/dashboards/Dashboard')));

// utilities
const Typography = Loadable(lazy(() => import('../views/typography/Typography')));
const Table = Loadable(lazy(() => import('../views/tables/Table')));
const Form = Loadable(lazy(() => import('../views/forms/Form')));
const Shadow = Loadable(lazy(() => import('../views/shadows/Shadow')));

// icons
const Solar = Loadable(lazy(() => import('../views/icons/Solar')));

// authentication

const Register = Loadable(lazy(() => import('../views/auth/register/Register')));
const SamplePage = Loadable(lazy(() => import('../views/sample-page/SamplePage')));
const Error = Loadable(lazy(() => import('../views/auth/error/Error')));

const Router = [
  {
    path: '/',
    element: <FullLayout />,
    children: [
      { path: '/', exact: true, element: <Dashboard /> },
      { path: '/ui/typography', exact: true, element: <Typography /> },
      { path: '/ui/table', exact: true, element: <Table /> },
      { path: '/ui/form', exact: true, element: <Form /> },
      { path: '/ui/shadow', exact: true, element: <Shadow /> },
      { path: '/icons/solar', exact: true, element: <Solar /> },
      { path: '/sample-page', exact: true, element: <SamplePage /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
  {
    path: '/',
    element: <BlankLayout />,
    children: [
      { path: '/auth/login', element: <Login /> },
      { path: '/auth/register', element: <Register /> },
      { path: '404', element: <Error /> },
      { path: '/auth/404', element: <Error /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
];
*/

// admin section
const AdminLogin = Loadable(lazy(() => import('@/admin/views/auth/login/Login')));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LayoutPage/>}>
          <Route index element={<HomePage/>}></Route>
          <Route path='/' element={<LayoutUser/>}>
            {/* if login return home by UnauthorizationLogin */}
            <Route element={<UnauthorizationLogin/>}>
              <Route path={routerConfig.login} element={<LoginPage/>}></Route>
              <Route path={routerConfig.register} element={<RegisterPage/>}></Route>
            </Route>
            <Route path={routerConfig.terms} element={<Terms/>}></Route>
            <Route path={routerConfig.userPolicy} element={<Policies/>}></Route>
            <Route path={routerConfig.course} element={<Course/>}></Route>
            <Route path={routerConfig.courseDetail} element={<CourseDetail/>}></Route>

            {/* Protect the route, must login to use */}
            <Route element={<ProtectedRoute/>}>
              <Route path={routerConfig.authenticate.user.carts} element={<CartPage/>}></Route>
              <Route path={routerConfig.authenticate.user.checkout} element={<CheckoutPage/>}></Route>
            </Route>
          </Route>
        </Route>

        {/* <Route path={routerConfig.admin.path}>
          <Route path='/' element={<FullLayout/>}>

          </Route>


          <Route path='/' element={<BlankLayout/>}>
              <Route path={routerConfig.admin.childrens.blankLayout.login} element={<AdminLogin/>}></Route>
          </Route>
        </Route> */}

        <Route path='*' element={<NotFoundPage/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

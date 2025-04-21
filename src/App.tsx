import './App.css'
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
import NotFoundPage from './pages/error/NotFound.Page';
import UnauthorizationLogin from './middlewares/UnauthorizationLogin/UnauthorizationLogin';
import Verification from './pages/auth/Verification/Verification';
import InstructorLandingPage from './pages/InstructorRequest/InstructorLandingPage/InstructorLandingPage';
import PermissionRoute from './middlewares/PermissionRoute/PermissionRoute';
import AdminLayout from './pages/layout/Admin.layout';
import UserManager from './pages/admin/UserManager/UserManager';
import { UserRole } from './common/constants/userRole';
import ProtectedRoute from './middlewares/ProtectedRoute/ProtectedRoute';
import CartPage from './pages/user/Cart/CartPage';
import InstructorRequestWrapper from './pages/InstructorRequest/InstructorRequestWrapper/InstructorRequestWrapper';
import CheckoutPage from './pages/user/Checkout/Checkout.Page';
import InstructorManager from './pages/admin/InstructorManager/InstructorManager';
import InstructorLayout from './pages/layout/Instructor.layout';
import InstructorCourseManagerPage from './pages/instructor/CourseManager/instructorCourseManagerPage';
import LessonManagerPage from './pages/instructor/LessonManagerPage/LessonManagerPage';
import ApproveCoursesPage from './pages/admin/ApproveCoursePage/ApproveCoursePage';
import CourseManage from './pages/admin/CourseManage/CourseManage';
import CategoryManagerPage from './pages/admin/CategoryManager/CategoryManagerPage';
import LearningPage from './pages/Learningpage/LearningPage';
import MyLearningPage from './pages/MyLearningPage/MyLearningPage';


/*


const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));

// Dashboard

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


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routerConfig.verification} element={<Verification/>}></Route>
        <Route path='/' element={<LayoutPage/>}>
          <Route path={routerConfig.authenticate.user.learning} element={<LearningPage />} />

          <Route index element={<HomePage/>}></Route>
          <Route path={routerConfig.courseDetail} element={<CourseDetail/>}></Route>

          <Route path='/' element={<LayoutUser/>}>
          <Route path={routerConfig.instructor} element={<InstructorLandingPage/>}></Route>

            {/* if login return home by UnauthorizationLogin */}
            <Route element={<UnauthorizationLogin/>}>
              <Route path={routerConfig.login} element={<LoginPage/>}></Route>
              <Route path={routerConfig.register} element={<RegisterPage/>}></Route>
            </Route>
            <Route path={routerConfig.terms} element={<Terms/>}></Route>
            <Route path={routerConfig.userPolicy} element={<Policies/>}></Route>
            <Route path={routerConfig.course} element={<Course/>}></Route>
            <Route path={routerConfig.courseDetail} element={<CourseDetail/>}></Route>

            <Route element={<ProtectedRoute/>}>
              <Route path={routerConfig.authenticate.user.myLearning} element={<MyLearningPage />} />

              <Route path={routerConfig.authenticate.user.carts} element={<CartPage/>}></Route>
              <Route path={routerConfig.authenticate.user.instructorRequest} element={<InstructorRequestWrapper/>}></Route>
              <Route path={routerConfig.authenticate.user.checkout} element={<CheckoutPage/>}></Route>
            </Route>
          </Route>
        </Route>
        <Route element={<ProtectedRoute/>}>
          <Route path="/instructor" element={<PermissionRoute allowedRoles={[UserRole.ADMIN, UserRole.INSTRUCTOR]} />}>
            <Route element={<InstructorLayout />}>
              <Route index element={<InstructorCourseManagerPage />} /> {/* 👈 Trang mặc định */}
              <Route path={routerConfig.instructorCourses} element={<InstructorCourseManagerPage />} />
              <Route path={routerConfig.instructorLessons} element={<LessonManagerPage />} />

              {/* <Route path="courses" element={<InstructorCourseManagerPage />} />
              <Route path="courses/:id/detail" element={<CourseDetailPage />} />
              <Route path="courses/:id/edit" element={<EditCoursePage />} /> */}
            </Route>
          </Route>

          <Route path={routerConfig.admin.path} element={<PermissionRoute allowedRoles={[UserRole.ADMIN]} />}>
            <Route element={<AdminLayout />}>
              <Route path={routerConfig.admin.childrens.fullLayout.userManager} element={<UserManager />} />
              <Route path={routerConfig.admin.childrens.fullLayout.instructorRequest} element={<InstructorManager />} />
              <Route path={routerConfig.admin.childrens.fullLayout.courseRequestManager} element={<ApproveCoursesPage />} />
              <Route path={routerConfig.admin.childrens.fullLayout.courseManager} element={<CourseManage/>} />
              <Route path={routerConfig.admin.childrens.fullLayout.categoryManager} element={<CategoryManagerPage/>} />
            </Route>
          </Route>
        </Route>

        <Route path='*' element={<NotFoundPage/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

import './App.css'
import React from 'react';
import LayoutPage from '@/pages/layout/Layout.Page';
import { BrowserRouter, Route, Routes } from 'react-router';
import HomePage from '@/pages/home/Home.Page';
import LayoutUser from '@/pages/layout/user/Layout.User';
import { routerConfig } from '@/configs/router.config';
import LoginPage from '@/pages/auth/Login/Login.Page';
import RegisterPage from '@/pages/auth/Register/Register.Page';
import Terms from '@/pages/Terms/Terms';
import Policies from '@/pages/Policies/Policies';
import Course from '@/pages/course/Course';
import CourseDetail from '@/pages/CourseDetail/CourseDetail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LayoutPage/>}>
          <Route index element={<HomePage/>}></Route>
          <Route path='/' element={<LayoutUser/>}>
            <Route path={routerConfig.login} element={<LoginPage/>}></Route>
            <Route path={routerConfig.register} element={<RegisterPage/>}></Route>
            <Route path={routerConfig.terms} element={<Terms/>}></Route>
            <Route path={routerConfig.userPolicy} element={<Policies/>}></Route>
            <Route path={routerConfig.course} element={<Course/>}></Route>
            <Route path={routerConfig.courseDetail} element={<CourseDetail/>}></Route>

            
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

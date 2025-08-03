import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from './views/auth/login/login.jsx';
import Register from './views/auth/register/register.jsx';
import RecoverPassword from './views/auth/recoverPassword/recoverPassword.jsx';
import NewPassword from './views/auth/newPassword/newPassword.jsx';
import Dashboard from './views/user/dashboard/dashboard.jsx';
import AboutUs from './views/user/aboutUs/aboutUs.jsx';
import Donations from './views/user/donations/donations.jsx';
import Questions from './views/user/questions/questions.jsx';
import Adoptions from './views/user/adoption/adoption.jsx';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to='/dashboard' replace/>
    },
    {
        path: '/login',
        element: <Login/>
    },
    {
        path: '/register',
        element: <Register/>
    },
    {
        path: '/recoverPassword',
        element: <RecoverPassword/>
    },
    {
        path: '/NewPassword',
        element: <NewPassword/>
    },
    {
        path: '/dashboard',
        element: <Dashboard/>
    },
    {
        path: '/aboutUs',
        element: <AboutUs/>
    },
    {
        path: '/donations',
        element: <Donations/>
    },
    {
        path: '/questions',
        element: <Questions/>
    },
    {
        path: '/adoption',
        element: <Adoptions/>
    },
    {
        path: '*',
        element: <Navigate to="/dashboard" replace/>
    }
])
import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from './views/auth/login.jsx';
import Register from './views/auth/register.jsx';
import RecoverPassword from './views/auth/recoverPassword.jsx';
import NewPassword from './views/auth/newPassword.jsx';
import Dashboard from './views/user/dashboard.jsx';
import AboutUs from './views/user/aboutUs.jsx';
import Donations from './views/user/donations.jsx';
import Questions from './views/user/questions.jsx';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to='/login' replace/>
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
        path: '*',
        element: <Navigate to="/dashboard" replace/>
    }
])
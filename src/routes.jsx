import { createBrowserRouter, Navigate } from "react-router-dom";
import { fetchInstance } from "./utils/Fetch.js";
import Login from './views/auth/login/login.jsx';
import Register from './views/auth/register/register.jsx';
import RecoverPassword from './views/auth/recoverPassword/recoverPassword.jsx';
import NewPassword from './views/auth/newPassword/newPassword.jsx';
import Dashboard from './views/user/dashboard/dashboard.jsx';
import AboutUs from './views/user/aboutUs/aboutUs.jsx';
import Donations from './views/user/donations/donations.jsx';
import Questions from './views/user/questions/questions.jsx';
import Adoptions from './views/user/adoption/adoption.jsx';
import Sponsor from './views/user/sponsor/sponsor.jsx';
import Loading from "./views/user/loading/Loading.jsx";

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
        element: <Adoptions/>,
        loader: async () => {
            await new Promise(resolve => setTimeout(resolve, 2000)); // Simula retraso de 1 segundo
            const response = await fetchInstance.get({ endpoint: '/animal',  headers: { 'Content-Type': 'application/json' } });
            const data = await response.json();
            console.table(data);
            return data.data;
        },
        hydrateFallbackElement: <Loading subtitle={'Cargando gatos...'}/>
    },
    {
        path: '/apadrinar',
        element: <Sponsor/>,
        loader: async () => {
            const response = await fetchInstance.get({ endpoint: '/animal',  headers: { 'Content-Type': 'application/json' } });
            const data = await response.json();
            return data.data;
        },
        hydrateFallbackElement: <div>Cargando...</div>
    },
    {
        path: '*',
        element: <Navigate to="/dashboard" replace/>
    },
    {
        path: '/test',
        element: <Loading subtitle={'Cargando gatos...'} compact/>
    }
])
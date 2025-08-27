import { createBrowserRouter, Navigate } from "react-router-dom";
import { fetchAllCats, fetchAdoptableCats } from "./api/Cats.js";
import { fetchRequestData } from "./api/Requests.js";
import { delay } from "./utils/delay.js";

//Views
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
import MedicalPanel from './views/user/medicalPanel/medicalPanel.jsx';
import Administration from './views/user/administration/administration.jsx';
import Request from './views/user/administration/views/request/request.jsx';
import Permision from './views/user/administration/views/permission/permission.jsx';
import RolAdmin from './views/user/administration/views/rol/rol.jsx';
import AppLayout from "./layouts/appLayout/AppLayout.jsx";
import NotFound from "./views/user/notFound/notFound.jsx";




export const router = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to='/dashboard' replace/>
    },
    {
        path: 'auth',
        children: [
    {
        path: 'login',
        element: <Login/>
    },
    {
        path: 'register',
        element: <Register/>
    },
    {
        path: 'recoverPassword',
        element: <RecoverPassword/>
    },
    {
        path: 'NewPassword',
        element: <NewPassword/>
    },
        ]
    },
    {
        element: <AppLayout/>,
        children: [
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
                loader: fetchAdoptableCats,
                hydrateFallbackElement: <div style={{marginTop: '250px'}}><Loading subtitle={'Cargando gatos adoptables...'} compact/></div>
            },
            {
                path: '/apadrinar',
                element: <Sponsor/>,
                loader: fetchAllCats,
                hydrateFallbackElement: <div style={{marginTop: '250px'}}><Loading subtitle={'Cargando gatos apadrinables...'} compact/></div>
            },
            {
                path: '/medical',
                element: <MedicalPanel/>,
                loader: async ()=>{
                    await delay(800);
                },
                hydrateFallbackElement: <div style={{marginTop: '250px'}}><Loading subtitle={'Cargando panel medico...'} compact/></div>
            },
            {
                path: '/administration',
                element: <Administration/>
            },
            {
                path: '/administration/request',
                element: <Request/>,
                loader: fetchRequestData,
                hydrateFallbackElement: <div style={{marginTop: '250px'}}><Loading subtitle={'Cargando solicitudes...'} compact/></div>
            },
                {
                    path: '/administration/rol',
                    element: <RolAdmin/>
                },
                {
                    path: '/administration/permission',
                    element: <Permision/>
                }
        ]
    },
    {
        path: '*',
        element: <NotFound/>
    },
    {
        path: '/test',
        element: <Loading subtitle={'Cargando gatos...'} compact/>
    }

])
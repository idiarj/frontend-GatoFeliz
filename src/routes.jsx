import { createBrowserRouter, Navigate } from "react-router-dom";
import { fetchInstance } from "./utils/Fetch.js";
import { delay } from "./utils/delay.js";
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
import RolesPermisos from './views/user/administration/views/test/test.jsx';
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
                loader: async () => {
                    await delay(1000);
                    const response = await fetchInstance.get({ endpoint: '/animal?adoptable=true',  headers: { 'Content-Type': 'application/json' } });
                    const data = await response.json();
                    console.table(data);
                    return data.data;
                },
                hydrateFallbackElement: <div style={{marginTop: '250px'}}><Loading subtitle={'Cargando gatos adoptables...'} compact/></div>
            },
            {
                path: '/apadrinar',
                element: <Sponsor/>,
                loader: async () => {
                    const response = await fetchInstance.get({ endpoint: '/animal?adoptable=false',  headers: { 'Content-Type': 'application/json' } });
                    const data = await response.json();
                    //data.data.forEach(cat=> console.table(cat))
                    return data.data;
                },
                hydrateFallbackElement: <div style={{marginTop: '250px'}}><Loading subtitle={'Cargando gatos apadrinables...'} compact/></div>
            },
            {
                path: '/medical',
                element: <MedicalPanel/>,
                loader: async () => {
                    // const response = await fetchInstance.get({ endpoint: '/medical', headers: { 'Content-Type': 'application/json' } });
                    // const data = await response.json();
                    // return data.data;
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
                loader: async ()=>{
                    const response = await fetchInstance.get({
                        endpoint: '/request-cat/pending',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    const { data } = await response.json();
                    return data;
                },
                hydrateFallbackElement: <div style={{marginTop: '250px'}}><Loading subtitle={'Cargando solicitudes...'} compact/></div>
            },
                {
                    path: '/administration/rol',
                    element: <RolAdmin/>
                },
                {
                    path: '/administration/test',
                    element: <RolesPermisos/>
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
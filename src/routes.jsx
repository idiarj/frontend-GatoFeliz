import { createBrowserRouter, Navigate } from "react-router-dom";
import { fetchAllCats, fetchAdoptableCats } from "./api/Cats.js";
import { fetchRequestData } from "./api/Requests.js";
import { me } from "./api/Auth.js";
import { delay } from "./utils/delay.js";
import { redirect } from "react-router-dom";
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
import Administration from './views/admin/administration/administration.jsx';
import Request from './views/admin/request/request.jsx';
import Permision from './views/admin/permission/permission.jsx';
import RolAdmin from './views/admin/rol/rol.jsx';
import AppLayout from "./layouts/appLayout/AppLayout.jsx";
import NotFound from "./views/user/notFound/notFound.jsx";
import Profile from './views/user/profile/profile.jsx';




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
                path: '/profile',
                element: <Profile/>,
                loader: async ()=>{
                    await delay(800);
                    const data = await me();
                    if(!data.success) {
                        console.log("No autenticado, redirigiendo a login");
                        throw redirect('/auth/login');
                    }
                    console.log("Profile loader data:", data);  
                    return data.data;
                },
                hydrateFallbackElement: <div style={{marginTop: '250px'}}><Loading subtitle={'Cargando perfil...'} compact/></div>
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
                element: <Administration/>,
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
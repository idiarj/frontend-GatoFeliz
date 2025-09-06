import { createBrowserRouter, Navigate } from "react-router-dom";
import { fetchAllCats, fetchAdoptableCats, fetchMyCats, fetchLastCat } from "./api/Cats.js";
import { fetchRequestData } from "./api/Requests.js";
import { me } from "./api/Auth.js";
import { getProfiles } from "./api/Admin.js";
import { fetchMedicalData } from "./api/Medical.js";
import { delay } from "./utils/delay.js";
import { redirect } from "react-router-dom";
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
import { MyCats } from "./views/user/myCats/MyCats.jsx";




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
                element: <Dashboard/>,
                loader: async ()=>{
                    // await delay(800);
                    let catData = await fetchLastCat({adoptable:true});
                    let sponsorCatData = await fetchLastCat({adoptable:false});
                    console.log("Dashboard loader data:", { catData, sponsorCatData });
                    return {catData, sponsorCatData}
                },
                hydrateFallbackElement: <div style={{marginTop: '250px'}}><Loading subtitle={'Cargando pagina principal...'} compact/></div>
            },
            {
                path: '/profile',
                element: <Profile/>,
                loader: async ()=>{
                    await delay(800);
                    const data = await me();
                    if(!data.success) {
                        console.log("No autenticado,~ redirigiendo a login");
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
                loader: async ()=>{
                    await delay(800);
                    let data = await fetchAdoptableCats();
                    if(!data.success || !data.data) {
                        data.data = [];
                    }
                    console.log("Adoptions loader data:", data);
                    return data;
                },
                hydrateFallbackElement: <div style={{marginTop: '250px'}}><Loading subtitle={'Cargando gatos adoptables...'} compact/></div>
            },
            {
                path: '/apadrinar',
                element: <Sponsor/>,
                loader: async ()=>{
                    await delay(800);
                    let data = await fetchAllCats();
                    if(!data.success || !data.data) {
                        data.data = [];
                    }
                    console.log("Sponsor loader data:", data);
                    return data;
                },
                hydrateFallbackElement: <div style={{marginTop: '250px'}}><Loading subtitle={'Cargando gatos apadrinables...'} compact/></div>
            },
            {
                path: '/tusGatos',
                element: <MyCats/>,
                loader: async ()=>{
                    await delay(800);
                    const data = await fetchMyCats();
                    if(!data.success) {
                        console.log("No autenticado, redirigiendo a login");
                        throw redirect('/auth/login');
                    }
                    console.log("MyCats loader data:", data);
                    return data;
                },
                hydrateFallbackElement: <div style={{marginTop: '250px'}}><Loading subtitle={'Cargando tus gatos...'} compact/></div>
            },
            {
                path: '/medical',
                element: <MedicalPanel/>,
                loader: async ()=>{
                    await delay(800);
                    const data = await fetchMedicalData();
                    return { ...data.data }
                },
                hydrateFallbackElement: <div style={{marginTop: '250px'}}><Loading subtitle={'Cargando panel medico...'} compact/></div>
            },
            {
                path: '/administration',
                element: <Administration/>,
                 loader: async ()=>{
                        await delay(800);
                        const data = await me();
                        if(!data.success) {
                            console.log("No autenticado, redirigiendo a login");
                            throw redirect('/auth/login');
                        }
                        console.log("Administration loader data:", data);
                        return;
                    }
            },
            {
                path: '/administration/request',
                element: <Request/>,
                loader: fetchRequestData,
                hydrateFallbackElement: <div style={{marginTop: '250px'}}><Loading subtitle={'Cargando solicitudes...'} compact/></div>
            },
            {
                    path: '/administration/rol',
                    element: <RolAdmin/>,
                     loader: async ()=>{
                        await delay(800);
                        const data = await me();
                        if(!data.success) {
                            console.log("No autenticado, redirigiendo a login");
                            throw redirect('/auth/login');
                        }
                        console.log("Permission loader data:", data);
                        return;
                    }
            },
            {
                    path: '/administration/permission',
                    element: <Permision/>,
                    loader: async ()=>{
                        await delay(800);
                        const permissions = await getProfiles();
                        if(!permissions.success) {
                            console.log("No autenticado, redirigiendo a login");
                            throw redirect('/auth/login');
                        }
                        console.log("Permission loader data:", permissions);
                        return permissions;
                    },
                    hydrateFallbackElement: <div style={{marginTop: '250px'}}><Loading subtitle={'Cargando permisologia...'} compact/></div>
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
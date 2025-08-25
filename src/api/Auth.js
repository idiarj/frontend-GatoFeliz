import { fetchInstance } from "../utils/Fetch";


export const register = async (body) => {
    const response = await fetchInstance.post({
        endpoint: '/auth/register',
        headers: { 'Content-Type': 'application/json' },
        body
    });
    return await response.json();
};

export const login = async (body) => {
    console.log('Iniciando sesión...');
    console.log(body)
    const response = await fetchInstance.post({
        endpoint: '/auth/login',
        body,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
    });
    return await response.json();
};

export const forgotPassword = async (body) => {
    const response = await fetchInstance.post({
        endpoint: '/auth/forgot-password',
        headers: { 'Content-Type': 'application/json' },
        body
    });
    return await response.json();
};

export const resetPassword = async (body) => {
    const response = await fetchInstance.patch({
        endpoint: '/auth/reset-password',
        headers: { 'Content-Type': 'application/json' },
        body
    });
    return await response.json();
};

export const me = async () => {
    const response = await fetchInstance.get({
        endpoint: '/auth/me',
        credentials: 'include'
    });
    return await response.json();
};

export const logout = async ()=>{
    const response = await fetchInstance.post({
        endpoint: '/auth/logout',
        credentials: 'include'
    });
    return await response.json();
};


// Environment variables are automatically available in React if prefixed with VITE_

class Fetch{
    constructor(baseUrl){
        this.baseUrl = baseUrl;
    }

    async get({endpoint, headers, credentials}){
        try {
            const response = await fetch(`${this.baseUrl}${endpoint}`, {
                method: 'GET',
                headers: headers,
                credentials: credentials
            });
            return response;
        }
        catch (error) {
            console.error('Fetch GET error:', error);
            throw error;
        }
    }

    async post({endpoint, body, headers, credentials}){
        try {
            const response = await fetch(`${this.baseUrl}${endpoint}`, {
                method: 'POST',
                headers: headers,
                credentials: credentials,
                body: JSON.stringify(body)
            });
            return response;
        }
        catch (error) {
            console.error('Fetch POST error:', error);
            throw error;
        }
    }

    async put({endpoint, body, headers, credentials}){
            try {
                const response = await fetch(`${this.baseUrl}${endpoint}`, {
                    method: 'PUT',
                    headers: headers,
                    credentials: credentials,
                    body: JSON.stringify(body)
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response;
            }catch (error) {
                console.error('Fetch POST error:', error);
                throw error;
            }
        }

    async patch({endpoint, body, headers, credentials}){
        try {
            const response = await fetch(`${this.baseUrl}${endpoint}`, {
                method: 'PATCH',
                headers: headers,
                credentials: credentials,
                body: JSON.stringify(body)
            });
            return response;
        }
        catch (error) {
            console.error('Fetch POST error:', error);
            throw error;
        }
    }

    async delete({endpoint, headers, credentials}){
        try {
            const response = await fetch(`${this.baseUrl}${endpoint}`, {
                method: 'DELETE',
                headers: headers,
                credentials: credentials
            });
            return response;
        }
        catch (error) {
            console.error('Fetch DELETE error:', error);
            throw error;
        }
    }
}


// Access environment variables directly in React (they are replaced at build time)
const baseUrl = import.meta.env.VITE_ENVIRONMENT === 'production'
    ? import.meta.env.VITE_RENDER_SERVER
    : import.meta.env.VITE_LOCAL_API;

console.log('Base URL:', baseUrl);

export const fetchInstance = new Fetch(baseUrl);
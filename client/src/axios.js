import axios from 'axios';

const apiClient = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? 'https://taskday-kappa.vercel.app/api' : 'http://localhost:4000/api',
    headers: {
        'Content-Type': 'application/json'
    }
})


export const getDataUsers = async () => {
    const response = await apiClient.get('/users');
    return response.data;
}
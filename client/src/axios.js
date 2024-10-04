import axios from 'axios';

const apiClient = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? 'https://taskday-4b5229bdc00d.herokuapp.com/' : 'http://localhost:4000',
    headers: {
        'Content-Type': 'application/json'
    }
})


export const getDataUsers = async () => {
    const response = await apiClient.get('/api/users');
    return response.data;
}
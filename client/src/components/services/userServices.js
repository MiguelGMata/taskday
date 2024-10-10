import axiosInstance from "./axios";

export const signInUser = async (email, password) => {
    const response = await axiosInstance.post('/api/signIn', { email, password });
    if (response.data.token) {
        localStorage.setItem('token', response.data.token)
    } else {
        console.error('erreur de token :', response.data);
    }
    return response.data

};

export const signupUser = async (firstName, lastName, email, password) => {
    try {
        const response = await axiosInstance.post('/api/signUp', { firstName, lastName, email, password });
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data.description || 'Erreur lors de l\'inscription');
        } else {
            throw new Error('Une erreur est survenue. Veuillez réessayer plus tard.');
        }
    }
};

export const profileUser = async () => {
    try {
        const response = await axiosInstance.get('/api/profile');
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data.message || 'Erreur profil');
        } else {
            throw new Error('Une erreur est survenue. Veuillez réessayer plus tard.');
        }
    }
};
import axiosInstance from "./axios";

export const createList = async (taskId, title) => {
    try {
        const response = await axiosInstance.post('/api/lists', { taskId, title });
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data.description || 'Erreur lors de la création de la liste');
        } else {
            throw new Error('Une erreur est survenue. Veuillez réessayer plus tard.');
        }
    }
};

export const getListsByTask = async (taskId) => {
    try {
        const response = await axiosInstance.get(`/api/tasks/${taskId}/lists`);
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data.message || 'Erreur lors de la récupération des listes');
        } else {
            throw new Error('Une erreur est survenue. Veuillez réessayer plus tard.');
        }
    }
};

export const getListById = async (id) => {
    try {
        const response = await axiosInstance.get(`/api/lists/${id}`);
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data.message || 'Erreur lors de la récupération de la liste');
        } else {
            throw new Error('Une erreur est survenue. Veuillez réessayer plus tard.');
        }
    }
};

export const updateList = async (list) => {
    const id = list.id
    const title = list.title
    try {
        const response = await axiosInstance.put(`/api/lists/${id}`, { title });
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data.message || 'Erreur lors de la mise à jour de la liste');
        } else {
            throw new Error('Une erreur est survenue. Veuillez réessayer plus tard.');
        }
    }
};

export const deleteList = async (id) => {
    try {
        const response = await axiosInstance.delete(`/api/lists/${id}`);
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data.message || 'Erreur lors de la suppression de la liste');
        } else {
            throw new Error('Une erreur est survenue. Veuillez réessayer plus tard.');
        }
    }
};

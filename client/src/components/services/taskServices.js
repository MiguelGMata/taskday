import axiosInstance from "./axios";


export const createTask = async (title) => {
    try {
        const response = await axiosInstance.post('/api/tasks', title);

        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data.description || 'Erreur lors de la création de la tâche');
        } else {
            throw new Error('Une erreur est survenue. Veuillez réessayer plus tard.');
        }
    }
};

export const getTasksByUser = async () => {
    try {
        const response = await axiosInstance.get('/api/tasks');
        console.log(response)
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data.message || 'Erreur lors de la récupération des tâches');
        } else {
            throw new Error('Une erreur est survenue. Veuillez réessayer plus tard.');
        }
    }
};

export const getTaskById = async (id) => {
    try {
        const response = await axiosInstance.get(`/api/tasks/${id}`);
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data.message || 'Erreur lors de la récupération de la tâche');
        } else {
            throw new Error('Une erreur est survenue. Veuillez réessayer plus tard.');
        }
    }
};

export const updateTask = async (id, title) => {
    try {
        const response = await axiosInstance.put(`/api/tasks/${id}`, title);
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data.message || 'Erreur lors de la mise à jour de la tâche');
        } else {
            throw new Error('Une erreur est survenue. Veuillez réessayer plus tard.');
        }
    }
};


export const deleteTask = async (id) => {
    try {
        const response = await axiosInstance.delete(`/api/tasks/${id}`);
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data.message || 'Erreur lors de la suppression de la tâche');
        } else {
            throw new Error('Une erreur est survenue. Veuillez réessayer plus tard.');
        }
    }
};

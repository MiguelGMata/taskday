import axiosInstance from "./axios";

// Crear una nueva tarjeta
export const createCard = async (listId, title) => {
    try {
        const response = await axiosInstance.post('/api/cards', { listId, title });
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data.description || 'Erreur lors de la création de la carte');
        } else {
            throw new Error('Une erreur est survenue. Veuillez réessayer plus tard.');
        }
    }
};
// Obtener tarjetas 
export const getCards = async (listId) => {
    try {
        const response = await axiosInstance.get(`/api/cards`);
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data.message || 'Erreur lors de la récupération des cartes');
        } else {
            throw new Error('Une erreur est survenue. Veuillez réessayer plus tard.');
        }
    }
};

// Obtener tarjetas por ID de lista
export const getCardsByList = async (listId) => {
    try {
        const response = await axiosInstance.get(`/api/lists/${listId}/cards`);
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data.message || 'Erreur lors de la récupération des cartes');
        } else {
            throw new Error('Une erreur est survenue. Veuillez réessayer plus tard.');
        }
    }
};

// Obtener una tarjeta por ID
export const getCardById = async (id) => {
    try {
        const response = await axiosInstance.get(`/api/cards/${id}`);
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data.message || 'Erreur lors de la récupération de la carte');
        } else {
            throw new Error('Une erreur est survenue. Veuillez réessayer plus tard.');
        }
    }
};

// Actualizar una tarjeta por ID
export const updateCard = async (card) => {
    const id = card.id;
    const title = card.title;
    const order = card.order;
    try {
        const response = await axiosInstance.put(`/api/cards/${id}`, { title, order });
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data.message || 'Erreur lors de la mise à jour de la carte');
        } else {
            throw new Error('Une erreur est survenue. Veuillez réessayer plus tard.');
        }
    }
};

// Eliminar una tarjeta por ID
export const deleteCard = async (id) => {
    try {
        const response = await axiosInstance.delete(`/api/cards/${id}`);
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data.message || 'Erreur lors de la suppression de la carte');
        } else {
            throw new Error('Une erreur est survenue. Veuillez réessayer plus tard.');
        }
    }
};

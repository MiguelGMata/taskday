import axiosInstance from "./axios";


export const saveBackground = async (background) => {
    try {
        await await axiosInstance.post(`/api/save`, { background });
    } catch (error) {
        console.error("Erreur lors de l'enregistrement de l'arrière-plan :", error);
    }
};

export const fetchBackground = async () => {
    try {
        const response = await axiosInstance.get(`/api/get`);
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la récupération de l'arrière-plan :", error);
        return null;
    }
};

import axiosInstance from "./axios";


export const saveBackground = async (background) => {
    try {
        await await axiosInstance.post(`/api/save`, { background }); // Asegúrate de que tu backend pueda manejar esto
    } catch (error) {
        console.error("Error saving background:", error);
    }
};

export const fetchBackground = async () => {
    try {
        const response = await axiosInstance.get(`/api/get`);
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error("Error fetching background:", error);
        return null;
    }
};

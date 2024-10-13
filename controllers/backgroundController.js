const models = require('../models');


exports.saveBackground = async (req, res) => {
    const { background } = req.body;
    const userId = req.user.id;

    try {
        // Verifica si ya existe un fondo para el usuario
        const existingBackground = await models.Background.findOne({ where: { userId } });

        if (existingBackground) {
            // Si ya existe, actualiza el fondo
            await models.Background.update({ background }, { where: { userId } });
            return res.status(200).json({ message: 'Background updated successfully!' });
        } else {
            // Si no existe, crea uno nuevo
            const newBackground = await models.Background.create({ background, userId });
            return res.status(201).json({ message: 'Background saved successfully!', data: newBackground });
        }
    } catch (error) {
        console.error("Error saving background:", error);
        res.status(500).json({ message: 'Error saving background', error });
    }
};


exports.fetchBackground = async (req, res) => {
    try {
        const background = await models.Background.findOne({ where: { userId: req.user.id } }); // Asegúrate de filtrar por userId
        if (!background) {
            return res.status(404).json({ message: 'No background found for this user' });
        }

        res.status(200).json(background.background);
    } catch (error) {
        console.error("Error fetching background:", error);
        res.status(500).json({ message: 'Error fetching background', error });
    }
};

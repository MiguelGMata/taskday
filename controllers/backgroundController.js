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
            return res.status(200).json({ message: 'Contexte mis à jour avec succès !' });
        } else {
            // Si no existe, crea uno nuevo
            const newBackground = await models.Background.create({ background, userId });
            return res.status(201).json({ message: 'Arrière-plan enregistré avec succès !', data: newBackground });
        }
    } catch (error) {
        console.error("Erreur lors de l'enregistrement de l'arrière-plan", error);
        res.status(500).json({ message: "Erreur lors de l'enregistrement de l'arrière-plan", error });
    }
};


exports.fetchBackground = async (req, res) => {
    try {
        const background = await models.Background.findOne({ where: { userId: req.user.id } });
        if (!background) {
            return res.status(404).json({ message: 'Aucun arrière-plan trouvé pour cet utilisateur' });
        }

        res.status(200).json(background.background);
    } catch (error) {
        console.error("Erreur lors de la récupération de l'arrière-plan :", error);
        res.status(500).json({ message: "Erreur lors de la récupération de l'arrière-plan :", error });
    }
};

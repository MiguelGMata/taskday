const models = require('../models');
const { BadRequestError, NotFoundError } = require('../middlewares/helpers/errors');


exports.createCard = async (req, res) => {
    const { listId, title, description } = req.body;

    if (!listId || !title) {
        throw new BadRequestError(
            'Mauvaise Requête',
            "Le listId et le titre sont obligatoires"
        );
    }

    try {
        const newCard = await models.Card.create({
            listId,
            title,
            description,
        });
        res.status(201).json({
            msg: "Carte créée avec succès",
            card: newCard,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la création de la carte" });
    }
};

exports.getCards = async (req, res) => {
    const { listId } = req.params;

    try {
        const cards = await models.Card.findAll();
        res.json(cards);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la récupération des cartes" });
    }
};


exports.getCardsByList = async (req, res) => {
    const { listId } = req.params;

    try {
        const cards = await models.Card.findAll({ where: { listId } });
        res.json(cards);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la récupération des cartes" });
    }
};


exports.getCardById = async (req, res) => {
    const { id } = req.params;

    try {
        const card = await models.Card.findByPk(id);
        if (!card) {
            throw new NotFoundError('Carte non trouvée', "La carte n'existe pas");
        }
        res.json(card);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la récupération de la carte" });
    }
};


exports.updateCard = async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;

    try {
        const card = await models.Card.findByPk(id);
        if (!card) {
            throw new NotFoundError('Carte non trouvée', "La carte n'existe pas");
        }

        card.title = title || card.title; // Actualiza solo el título si se proporciona
        card.description = description || card.description; // Actualiza solo la descripción si se proporciona
        await card.save();

        res.json({
            msg: "Carte mise à jour avec succès",
            card,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la mise à jour de la carte" });
    }
};


exports.deleteCard = async (req, res) => {
    const { id } = req.params;

    try {
        const card = await models.Card.findByPk(id);
        if (!card) {
            throw new NotFoundError('Carte non trouvée', "La carte n'existe pas");
        }

        await card.destroy();
        res.json({ msg: "Carte supprimée avec succès" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la suppression de la carte" });
    }
};

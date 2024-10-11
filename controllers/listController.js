const models = require('../models');
const { BadRequestError, NotFoundError } = require('../middlewares/helpers/errors');


exports.createList = async (req, res) => {
    const { taskId, title } = req.body;

    if (!taskId || !title) {
        throw new BadRequestError(
            'Mauvaise Requête',
            "Le taskId et le titre sont obligatoires"
        );
    }

    try {
        const newList = await models.List.create({
            taskId,
            title,
        });
        res.status(201).json({
            msg: "Liste créée avec succès",
            list: newList,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la création de la liste" });
    }
};


exports.getListsByTask = async (req, res) => {
    const { taskId } = req.params;

    try {
        const lists = await models.List.findAll({ where: { taskId } });
        res.json(lists);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la récupération des listes" });
    }
};


exports.getListById = async (req, res) => {
    const { id } = req.params;

    try {
        const list = await models.List.findByPk(id);
        if (!list) {
            throw new NotFoundError('Liste non trouvée', "La liste n'existe pas");
        }
        res.json(list);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la récupération de la liste" });
    }
};


exports.updateList = async (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    try {
        const list = await models.List.findByPk(id);
        if (!list) {
            throw new NotFoundError('Liste non trouvée', "La liste n'existe pas");
        }

        list.title = title || list.title; // Actualiza solo el título si se proporciona
        await list.save();

        res.json({
            msg: "Liste mise à jour avec succès",
            list,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la mise à jour de la liste" });
    }
};


exports.deleteList = async (req, res) => {
    const { id } = req.params;

    try {
        const list = await models.List.findByPk(id);
        if (!list) {
            throw new NotFoundError('Liste non trouvée', "La liste n'existe pas");
        }

        await list.destroy();
        res.json({ msg: "Liste supprimée avec succès" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la suppression de la liste" });
    }
};

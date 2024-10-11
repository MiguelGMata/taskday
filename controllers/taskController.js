const models = require('../models');
const { BadRequestError, NotFoundError } = require('../middlewares/helpers/errors');

exports.createTask = async (req, res) => {
    const { title } = req.body;
    console.log(title)
    const userId = req.user.id; // Asumiendo que tienes el ID del usuario en la petición

    if (!title) {
        throw new BadRequestError('Mauvaise Requête', "Le titre est obligatoire");
    }

    try {
        const newTask = await models.Task.create({
            title,
            userId
        });
        res.status(201).json({
            msg: "Tâche créée avec succès",
            task: newTask
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la création de la tâche" });
    }
};

exports.getTasksByUser = async (req, res) => {
    const userId = req.user.id; // Asumiendo que tienes el ID del usuario en la petición

    try {
        const tasks = await models.Task.findAll({ where: { userId } });
        res.json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la récupération des tâches" });
    }
};

exports.getTaskById = async (req, res) => {
    const { id } = req.params;

    try {
        const task = await models.Task.findByPk(id);
        if (!task) {
            throw new NotFoundError('Non trouvé', "Tâche non trouvée");
        }
        res.json(task);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la récupération de la tâche" });
    }
};

exports.updateTask = async (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    if (!title) {
        throw new BadRequestError('Mauvaise Requête', "Le titre est obligatoire");
    }

    try {
        const task = await models.Task.findByPk(id);
        if (!task) {
            throw new NotFoundError('Non trouvé', "Tâche non trouvée");
        }

        task.title = title;
        await task.save();

        res.json({
            msg: "Tâche mise à jour avec succès",
            task
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la mise à jour de la tâche" });
    }
};

exports.deleteTask = async (req, res) => {
    const { id } = req.params;

    try {
        const task = await models.Task.findByPk(id);
        if (!task) {
            throw new NotFoundError('Non trouvé', "Tâche non trouvée");
        }

        await task.destroy();
        res.json({ msg: "Tâche supprimée avec succès" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la suppression de la tâche" });
    }
};

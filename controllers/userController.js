const { User } = require('../models');

exports.users = async (req, res) => {
    try {
        const users = await User.findAll();
        console.log(users)
        res.json(users);
    } catch {
        (err)
        console.error(err)
        res.status(500).json({ error: "Erreur lors de la récupération des utilisateurs" })
    }
}
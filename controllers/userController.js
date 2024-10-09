const bcrypt = require('bcryptjs');
const models = require('../models');
const jwttoken = require('../middlewares/jwt');
const { OK } = require('../middlewares/helpers/status_codes');
const { BadRequestError, UnauthorizedError, ForbiddenError } = require('../middlewares/helpers/errors');

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX = /^(?=.*\d).{4,8}$/;
const FIRSTNAME_REGEX = /^[a-zA-Z]{1,}$/;

exports.users = async (req, res) => {
    try {
        const users = await models.User.findAll();
        res.json(users);
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: "Erreur lors de la récupération des utilisateurs" })
    }
}

exports.signUp = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
        throw new BadRequestError(
            'Mauvaise Requête',
            "Tous les champs sont obligatoires"
        );
    }

    if (!FIRSTNAME_REGEX.test(firstName)) {
        throw new BadRequestError(
            'Mauvaise Requête',
            "Le nom ne peut contenir que des lettres"
        );
    }

    if (!EMAIL_REGEX.test(email)) {
        throw new BadRequestError(
            'Mauvaise Requête',
            "L'email n'est pas valide, veuillez recommencer."
        );
    }

    if (!PASSWORD_REGEX.test(password)) {
        throw new BadRequestError(
            'Mauvaise Requête',
            "Mot de passe invalide (doit avoir une longueur de 4 à 8 caractères et inclure au moins un chiffre)"
        );
    }

    try {
        const existingUser = await models.User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ msg: "L'utilisateur est déjà enregistré" });
        }


        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await models.User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        });
        res.status(201).json({
            msg: "Utilisateur enregistré avec succès",
            user: {
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,
            }
        });

    } catch (error) {
        throw error;
    }
};

exports.signIn = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new BadRequestError(
            'Mauvaise Requête',
            "L'email et le mot de passe sont obligatoires"
        );
    }

    try {
        const user = await models.User.findOne({ where: { email } });
        if (!user) {
            throw new UnauthorizedError(
                'Non Autorisé',
                "Utilisateur non trouvé"
            );
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedError(
                'Non Autorisé',
                "Mot de passe incorrect"
            );
        }

        res.status(OK).json({
            msg: "Connexion réussie",
            user: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            },
            token: jwttoken.generateTokenForUser(user),
        });

    } catch (error) {
        throw error;
    }
};

exports.profile = async (req, res) => {
    var headerAuth = req.headers['authorization'];
    const userId = jwttoken.getUserId(headerAuth);


    if (userId < 0) {
        return res.status(401).json({
            msg: 'Non autorisé',
            detail: 'Vous devez être connecté pour accéder à cette ressource.'
        });
    }

    try {
        const user = await models.User.findByPk(userId);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ msg: "L'utilisateur n'existe pas" });
        }
    } catch (err) {
        throw err;
    }
};



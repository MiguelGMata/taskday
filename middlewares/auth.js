const { getUserId } = require('./jwt');
const { UnauthorizedError } = require('./helpers/errors');

const authenticateToken = (req, res, next) => {
    const authorization = req.headers['authorization'];
    const userId = getUserId(authorization);

    if (userId === -1) {
        throw new UnauthorizedError('Non Autorisé', "Token invalide");
    }

    req.user = { id: userId }; // Guarda el ID del usuario en la solicitud
    next();
};

module.exports = authenticateToken;

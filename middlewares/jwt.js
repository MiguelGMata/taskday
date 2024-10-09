const jwt = require('jsonwebtoken');

const JWT_SIGN_SECRET = 'sdlfhdslkfhdslfh820289fdsf0982298sdlfkjf0019';
module.exports = {
  generateTokenForUser: (userData) => {
    return jwt.sign( // pour signer le token
      {
        userId: userData.id,
      },
      JWT_SIGN_SECRET,
      {
        expiresIn: '10h',
      }
    );
  },
  parseAuthorization: (authorization) => {
    return authorization != null ? authorization.replace('Bearer ', '') : null;
  },
  getUserId: (authorization) => {
    var userId = -1;
    var token = module.exports.parseAuthorization(authorization);
    if (token != null) {
      try {
        var jwtToken = jwt.verify(token, JWT_SIGN_SECRET);
        if (jwtToken != null) userId = jwtToken.userId;
      } catch (err) { }
    }
    return userId;
  }
};

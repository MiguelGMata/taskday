const { UNAUTHORIZED } = require('../status_codes');

module.exports = class UnauthorizedError extends Error {
  constructor(title, description, ...params) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, UnauthorizedError);
    }

    this.name = `UnauthorizedError: ${title}`;
    this.status = UNAUTHORIZED;
    this.title = title;
    this.description = description;
  }
};

const { FORBIDDEN } = require('../status_codes');

module.exports = class ForbiddenError extends Error {
  constructor(title, description, ...params) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ForbiddenError);
    }

    this.name = `ForbiddenError: ${title}`;
    this.status = FORBIDDEN;
    this.title = title;
    this.description = description;
  }
};

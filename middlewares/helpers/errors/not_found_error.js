const { NOT_FOUND } = require('../status_codes');

module.exports = class NotFoundError extends Error {
  constructor(title, description, ...params) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, NotFoundError);
    }
    this.name = `NotFoundError: ${title}`;
    this.status = NOT_FOUND;
    this.title = title;
    this.description = description;
  }
};

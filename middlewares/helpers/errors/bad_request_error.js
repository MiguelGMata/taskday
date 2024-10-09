const { BAD_REQUEST } = require("../status_codes");

module.exports = class BadRequestError extends Error {
  constructor(title, description, ...params) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, BadRequestError);
    }

    this.name = `BadRequestError: ${title}`;
    this.status = BAD_REQUEST;
    this.title = title;
    this.description = description;
  }
};
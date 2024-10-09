const BadRequestError = require('./bad_request_error');
const ServerError = require('./server_error');
const ConflictError = require('./conflict_error');
const ForbiddenError = require('./forbidden_error');
const UnauthorizedError = require('./unauthorized_error');
const NotFoundError = require('./not_found_error');

module.exports = {
  BadRequestError,
  ServerError,
  ConflictError,
  ForbiddenError,
  UnauthorizedError,
  NotFoundError
};

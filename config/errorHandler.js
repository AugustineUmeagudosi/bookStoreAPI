import { Response } from '../app/utils';

module.exports = function errorHandler(error, req, res) {
  let code = error.statusCode ? error.statusCode : 500;
  let message =
    process.env.NODE_ENV === 'production'
      ? 'Ops!. Something went wrong :('
      : error.message;

  if (error.message === 'jwt malformed') {
    message = 'Invalid or expired token';
    code = 401;
  }

  if (
    error.message === 'jwt expired' ||
    error.message === 'invalid signature'
  ) {
    message = 'Session expired. Kindly login to continue.';
    code = 401;
  }
  if (error.statusCode === 404)
    message = 'The resource you are looking for was not found.';

  logger.error(error.message);
  return Response.error(res, message, code);
};

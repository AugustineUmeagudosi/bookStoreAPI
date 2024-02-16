/* eslint-disable import/prefer-default-export */
import { Response, Helpers } from '../utils';
import errorHandler from '../../config/errorHandler';

/**
 * Authenticates the user.
 * @param { Object } req - The request from the endpoint.
 * @param { Object } res - The response returned by the method.
 * @param { function } next - Calls the next handle.
 * @returns { JSON | Null } - Returns error response if authentication fails or Null if otherwise.
 * @memberof accessControl Middleware
 */
export const isAuthenticated = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith('Bearer')) return Response.error(res, 'Kindly login to continue', 401);

    const token = authorization.split(' ')[1];
    const decoded = Helpers.verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    return errorHandler(error, req, res);
  }
};

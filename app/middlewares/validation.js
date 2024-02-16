import { validateInput } from '../utils/helpers';
import { Response } from '../utils';

export default class ValidationMiddleware {
  /**
   * @static
   */
  static validate(schema) {
    return async (req, res, next) => {
      try {
        await validateInput(schema, req.body);
        next();
      } catch (error) {
        return Response.error(res, error.details[0].message, 400);
      }
    };
  }
}

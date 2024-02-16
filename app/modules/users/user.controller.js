import _ from 'lodash';
import { Response, Helpers, Constants } from '../../utils';
import UserServices from './user.service';

/**
 * controllers that contains methods for authentication processes
 * @class UserController
 */
class UserController {
  /**
   * to creates a new user
   *
   * @static
   * @param { Request } req - The request from the endpoint.
   * @param { Response } res - The response returned by the method.
   * @returns { JSON } A JSON response with a success message or error.
   * @memberof UserController
  */
  static async signUp(req, res) {
    const email = req.body.email.trim().toLowerCase();
    const password = await Helpers.hashPassword(req.body.password);

    const userExists = await UserServices.getUserByEmailOrReference({ email });
    if (userExists) return Response.error(res, 'Account already exists. Kindly proceed to the login screen', 400);

    const user = await UserServices.createUser({
      email,
      password,
      name: req.body.name
    });

    return Response.info(res, 'Sign up successful!', 201, user);
  }

  /**
   * user login
   *
   * @static
   * @param { Request } req - The request from the endpoint.
   * @param { Response } res - The response returned by the method.
   * @returns { JSON } A JSON response with a success message or error.
   * @memberof UserController
  */
  static async login(req, res) {
    const email = req.body.email.trim().toLowerCase();

    const user = await UserServices.getUserByEmailOrReference({ email });
    if (!user) return Response.error(res, 'Invalid email or password', 400);

    const passwordMatch = Helpers.comparePassword(req.body.password, user.password);
    if (!passwordMatch) return Response.error(res, 'Invalid email or password', 400);

    const sessionToken = Helpers.generateAuthToken({
      userReference: user.reference,
      role: user.role,
    });

    const data = _.pick(user, Constants.userDetails);
    data.auth_token = sessionToken;
    return Response.info(res, 'Login successful!', 200, data);
  }
}

export default UserController;

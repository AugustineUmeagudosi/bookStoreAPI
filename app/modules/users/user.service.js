import db from '../../db';
import { Helpers } from '../../utils';
import UserQueries from './user.queries';

/**
 * Contains a collection of service methods for managing user resource on the app.
 * @class UserServices
 */
export default class UserServices {
  /**
   * creates a new user
   * @memberof UserServices
   * @param { string } email - The email of the user
   * @param { string } name - The name of the user
   * @param { string } password - The password of the user
   * @returns { Promise<Object | Error> } A promise that resolves or rejects
   * with an Object of the user resource or a DB Error.
   */
  static async createUser({ email, name, password }) {
    return db.oneOrNone(UserQueries.createUser, [
      Helpers.generateToken(10), name, email, password
    ]);
  }

  /**
   * Finds a user using email or reference
   * @memberof UserServices
   * @param { string } email - The email of the user
   * @param { string } userReference - The reference of the user
   * @returns { Promise<Object | Error> } A promise that resolves or rejects
   * with an Object of the user resource or a DB Error.
   */
  static async getUserByEmailOrReference({ email, userReference }) {
    return db.oneOrNone(UserQueries.getUserByEmailOrReference, [
      email,
      userReference
    ]);
  }
}

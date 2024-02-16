import db from '../../db';
import { Helpers } from '../../utils';
import PlanQueries from './book.queries';

/**
 * Contains a collection of service methods for managing plan resource on the app.
 * @class PlanServices
 */
export default class PlanServices {
  /**
   * creates a new plan
   * @memberof PlanServices
   * @param { string } name - The name of the plan
   * @param { number } price - The price of the plan
   * @param { Array } benefits - The benefits of the plan
   * @returns { Promise<Object | Error> } A promise that resolves or rejects
   * with an Object of the plan resource or a DB Error.
   */
  static async createPlan({ name, price, benefits, duration }) {
    return db.oneOrNone(PlanQueries.createPlan, [
      Helpers.generateToken(10), name, price, benefits, duration
    ]);
  }

  /**
   * updates an existing plan
   * @memberof PlanServices
   * @param { string } name - The name of the plan
   * @param { number } price - The price of the plan
   * @param { Array } benefits - The benefits of the plan
   * @returns { Promise<Object | Error> } A promise that resolves or rejects
   * with an Object of the plan resource or a DB Error.
   */
  static async updatePlan({ reference, name, price, benefits, duration }) {
    return db.oneOrNone(PlanQueries.updatePlan, [
      reference, name, price, benefits, duration
    ]);
  }

  /**
   * fetches one plan by reference
   * @memberof PlanServices
   * @returns { Promise<Object | Error> } A promise that resolves or rejects
   * with an Object of the plan resource or a DB Error.
   */
  static async getPlan(reference) {
    return db.oneOrNone(PlanQueries.getPlan, [reference]);
  }

  /**
   * fetches all created plans
   * @memberof PlanServices
   * @returns { Promise<Object | Error> } A promise that resolves or rejects
   * with an Object of the plan resource or a DB Error.
   */
  static async getPlans() {
    return db.manyOrNone(PlanQueries.getPlans, []);
  }
}

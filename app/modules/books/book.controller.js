import { Response } from '../../utils';
import PlanServices from './book.service';

/**
 * controllers that contains methods for authentication processes
 * @class PlanController
 */
class PlanController {
  /**
   * to creates a new plan
   *
   * @static
   * @param { Request } req - The request from the endpoint.
   * @param { Response } res - The response returned by the method.
   * @returns { JSON } A JSON response with a success message or error.
   * @memberof PlanController
  */
  static async createPlan(req, res) {
    return Response.info(
      res,
      'Plan created successfully!',
      201,
      await PlanServices.createPlan(req.body)
    );
  }

  /**
   * to updates an existing plan
   *
   * @static
   * @param { Request } req - The request from the endpoint.
   * @param { Response } res - The response returned by the method.
   * @returns { JSON } A JSON response with a success message or error.
   * @memberof PlanController
  */
  static async updatePlan(req, res) {
    const { params: { planReference }, body: { name, price, benefits, duration } } = req;

    const plan = await PlanServices.getPlan(planReference);
    if (!plan) return Response.error(res, 'Invalid plan reference', 400);

    const data = {
      reference: planReference,
      name: name || plan.name,
      benefits: benefits || plan.benefits,
      price: price || plan.price,
      duration: duration || plan.duration
    };

    return Response.info(
      res,
      'Plan updated successfully!',
      200,
      await PlanServices.updatePlan(data)
    );
  }

  /**
   * fetches all plans
   *
   * @static
   * @param { Request } req - The request from the endpoint.
   * @param { Response } res - The response returned by the method.
   * @returns { JSON } A JSON response with a success message or error.
   * @memberof PlanController
  */
  static async getPlans(req, res) {
    return Response.info(
      res,
      'Plans fetched successfully!',
      200,
      await PlanServices.getPlans()
    );
  }
}

export default PlanController;

import { Response } from '../../utils';
import OrderServices from './order.service';
import BookServices from '../books/book.service';

/**
 * controllers that contains methods for managing orders
 * @class OrderController
 */
class OrderController {
  /**
   * creates an order
   *
   * @static
   * @param { Request } req - The request from the endpoint.
   * @param { Response } res - The response returned by the method.
   * @returns { JSON } A JSON response with a success message or error.
   * @memberof OrderController
  */
  static async createOrder(req, res) {
    const { body, user: { userReference } } = req;

    const books = await BookServices.getBooksByArrayOfReferences(Object.keys(body.books));
    if (!books.length) return Response.error(res, 'Please enter valid book references', 422);

    return Response.info(
      res,
      'order created successfully!',
      200,
      await OrderServices.createOrder(body, userReference, books)
    );
  }

  /**
   * fetches all orders
   *
   * @static
   * @param { Request } req - The request from the endpoint.
   * @param { Response } res - The response returned by the method.
   * @returns { JSON } A JSON response with a success message or error.
   * @memberof OrderController
  */
  static async getOrders(req, res) {
    const { query, user: { userReference } } = req;

    return Response.info(
      res,
      'orders fetched successfully!',
      200,
      await OrderServices.getOrders(query, userReference)
    );
  }
}

export default OrderController;

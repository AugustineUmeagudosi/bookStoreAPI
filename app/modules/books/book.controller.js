import { Response } from '../../utils';
import booksServices from './book.service';

/**
 * controllers that contains methods for managing books
 * @class BookController
 */
class BookController {
  /**
   * fetches all books
   *
   * @static
   * @param { Request } req - The request from the endpoint.
   * @param { Response } res - The response returned by the method.
   * @returns { JSON } A JSON response with a success message or error.
   * @memberof BookController
  */
  static async getBooks(req, res) {
    return Response.info(
      res,
      'books fetched successfully!',
      200,
      await booksServices.getBooks(req.query)
    );
  }
}

export default BookController;

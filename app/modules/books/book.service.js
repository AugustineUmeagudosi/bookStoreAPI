import db from '../../db';
import { Helpers } from '../../utils';
import BookQueries from './book.queries';

/**
 * Contains a collection of service methods for managing book resource on the app.
 * @class BookServices
 */
export default class BookServices {
  /**
   * fetches all created books
   * @memberof BookServices
   * @returns { Promise<Object | Error> } A promise that resolves or rejects
   * with an Object of the book resource or a DB Error.
  */
  static async getBooks({ page, size }) {
    if (!page) return db.manyOrNone(BookQueries.getBooks, []);

    const [{ count }, books] = await Helpers.fetchResourceByPage({
      page,
      size,
      getCount: BookQueries.countPaginatedBooks,
      countParams: [],
      getResources: BookQueries.getPaginatedBooks,
      params: [],
    });

    return {
      total: count,
      currentPage: page,
      totalPages: Helpers.calculatePages(count, size),
      books
    };
  }

  /**
   * fetches books by array of book references
   * @memberof BookServices
   * @returns { Promise<Object | Error> } A promise that resolves or rejects
   * with an Object of the book resource or a DB Error.
  */
  static async getBooksByArrayOfReferences(bookReferences) {
    return db.manyOrNone(BookQueries.getBooksByArrayOfReferences, [bookReferences]);
  }
}

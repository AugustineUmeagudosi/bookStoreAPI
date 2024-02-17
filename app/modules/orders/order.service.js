import db from '../../db';
import { Helpers } from '../../utils';
import orderQueries from './order.queries';
import BookServices from '../books/book.service';

/**
 * Contains a collection of service methods for managing order resource on the app.
 * @class OrderServices
 */
export default class OrderServices {
  /**
   * creates an order
   * @memberof OrderServices
   * @returns { Promise<Object | Error> } A promise that resolves or rejects
   * with an Object of the order resource or a DB Error.
  */
  static async createOrder({ books: orderedBooks }, userReference) {
    const books = await BookServices.getBooksByArrayOfReferences(Object.keys(orderedBooks));

    let totalPrice = 0;
    books.forEach(book => {
      totalPrice += (book.price * orderedBooks[book.reference]);
      book.quantity = orderedBooks[book.reference];
      book.totalAmount = book.price * orderedBooks[book.reference];
    });

    const order = await db.one(orderQueries.createOrder, [
      Helpers.generateToken(10), userReference, totalPrice, Object.keys(orderedBooks).length
    ]);

    await this.createOrderItems(books, order.reference);
    return order;
  }

  /**
   * creates an order Items
   * @memberof OrderServices
   * @returns { Promise<Object | Error> } A promise that resolves or rejects
   * with an Object of the order resource or a DB Error.
  */
  static async createOrderItems(books, orderReference) {
    const data = [];

    books.forEach(book => {
      data.push({
        query: orderQueries.createOrderItem,
        payload: [
          Helpers.generateToken(10),
          orderReference,
          book.reference,
          book.quantity,
          book.totalAmount
        ]
      });
    });

    return db.tx(t => {
      const sqlParam = [];
      data.forEach(item => {
        sqlParam.push(t.any(item.query, item.payload));
      });
      return t.batch(sqlParam);
    });
  }

  /**
   * fetches all created orders
   * @memberof OrderServices
   * @returns { Promise<Object | Error> } A promise that resolves or rejects
   * with an Object of the order resource or a DB Error.
  */
  static async getOrders({ page, size }, userReference) {
    if (!page) return db.manyOrNone(orderQueries.getOrders, [userReference]);

    const [{ count }, orders] = await Helpers.fetchResourceByPage({
      page,
      size,
      getCount: orderQueries.countPaginatedOrders,
      countParams: [userReference],
      getResources: orderQueries.getPaginatedOrders,
      params: [userReference],
    });

    return {
      total: count,
      currentPage: page,
      totalPages: Helpers.calculatePages(count, size),
      orders
    };
  }
}

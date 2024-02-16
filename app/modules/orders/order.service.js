import db from '../../db';
import { Helpers } from '../../utils';
import orderQueries from './order.queries';

/**
 * Contains a collection of service methods for managing order resource on the app.
 * @class OrderServices
 */
export default class OrderServices {
  /**
   * fetches all created orders
   * @memberof OrderServices
   * @returns { Promise<Object | Error> } A promise that resolves or rejects
   * with an Object of the order resource or a DB Error.
  */
  static async getOrders({ page, size }) {
    if (!page) return db.manyOrNone(orderQueries.getOrders, []);

    const [{ count }, orders] = await Helpers.fetchResourceByPage({
      page,
      size,
      getCount: orderQueries.countPaginatedOrders,
      countParams: [],
      getResources: orderQueries.getPaginatedOrders,
      params: [],
    });

    return {
      total: count,
      currentPage: page,
      totalPages: Helpers.calculatePages(count, size),
      orders
    };
  }
}

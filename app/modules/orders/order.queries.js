export default {
  getOrders: `
  SELECT
    orders.reference,
    orders.user_id,
    orders.total_amount,
    orders.status,
    orders.created_at,
    orders.updated_at,
    (
      SELECT COUNT(*)
      FROM order_items
      WHERE order_items.order_id = orders.reference
    ) AS total_items
  FROM orders
  WHERE orders.user_id = $1;
  `,

  getPaginatedOrders: `
    SELECT
      orders.reference,
      orders.user_id,
      orders.total_amount,
      orders.status,
      orders.created_at,
      orders.updated_at,
      (
        SELECT COUNT(*)
        FROM order_items
        WHERE order_items.order_id = orders.reference
      ) AS total_items
    FROM orders
    WHERE orders.user_id = $3
    OFFSET $1
    LIMIT $2;
  `,

  countPaginatedOrders: `
    SELECT COUNT(id)
    FROM orders
    WHERE orders.user_id = $1;
  `,

  createOrder: `
    INSERT INTO orders(reference, user_id, total_amount)
    VALUES ($1, $2, $3)
    RETURNING reference, user_id, total_amount, status, created_at;
  `,

  createOrderItem: `
    INSERT INTO order_items(reference, order_id, book_id, quantity, amount)
    VALUES ($1, $2, $3, $4, $5);
  `,
};

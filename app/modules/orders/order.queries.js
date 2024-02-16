export default {
  getOrders: `
    SELECT
      orders.reference,
      orders.user_id,
      orders.total_amount,
      orders.payment_method,
      orders.status,
      orders.created_at,
      orders.updated_at,
      COALESCE((
        SELECT json_agg(
          json_build_object(
            'reference', order_items.reference,
            'order_id', order_items.order_id,
            'book_id', order_items.book_id,
            'quantity', order_items.quantity,
            'amount', order_items.amount,
            'created_at', order_items.created_at,
            'updated_at', order_items.updated_at
          )
        )
        FROM order_items
        WHERE order_items.order_id = orders.reference
      ), '[]'::json) AS orderItems
    FROM orders
    LEFT JOIN order_items ON orders.reference = order_items.order_id
    WHERE orders.user_id = $1
    GROUP BY
    orders.reference,
    orders.user_id,
    orders.total_amount,
    orders.payment_method,
    orders.status,
    orders.created_at,
    orders.updated_at;
  `,

  getPaginatedOrders: `
    SELECT
      orders.reference,
      orders.user_id,
      orders.total_amount,
      orders.payment_method,
      orders.status,
      orders.created_at,
      orders.updated_at,
      COALESCE((
        SELECT json_agg(
          json_build_object(
            'reference', order_items.reference,
            'order_id', order_items.order_id,
            'book_id', order_items.book_id,
            'quantity', order_items.quantity,
            'amount', order_items.amount,
            'created_at', order_items.created_at,
            'updated_at', order_items.updated_at
          )
        )
        FROM order_items
        WHERE order_items.order_id = orders.reference
      ), '[]'::json) AS orderItems
    FROM orders
    LEFT JOIN order_items ON orders.reference = order_items.order_id
    WHERE orders.user_id = $3
    GROUP BY
    orders.reference,
    orders.user_id,
    orders.total_amount,
    orders.payment_method,
    orders.status,
    orders.created_at,
    orders.updated_at
    OFFSET $1
    LIMIT $2;
  `,

  countPaginatedOrders: `
    SELECT COUNT(id)
    FROM orders
    WHERE orders.user_id = $1;
  `,

  createOrder: `
    INSERT INTO orders(reference, user_id, total_amount, payment_method)
    VALUES ($1, $2, $3, $4)
    RETURNING reference, user_id, total_amount, payment_method, status, created_at;
  `,

  createOrderItem: `
    INSERT INTO order_items(reference, order_id, book_id, quantity, amount)
    VALUES ($1, $2, $3, $4, $5);
  `,
};

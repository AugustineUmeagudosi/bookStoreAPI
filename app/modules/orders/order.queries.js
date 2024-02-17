export default {
  getOrders: `
  SELECT
    reference,
    user_id,
    total_amount,
    status,
    created_at,
    updated_at,
    total_items
  FROM orders
  WHERE user_id = $1;
  `,

  getPaginatedOrders: `
    SELECT
      reference,
      user_id,
      total_amount,
      status,
      created_at,
      updated_at,
      total_items
    FROM orders
    WHERE user_id = $3
    OFFSET $1
    LIMIT $2;
  `,

  countPaginatedOrders: `
    SELECT COUNT(id)
    FROM orders
    WHERE orders.user_id = $1;
  `,

  createOrder: `
    INSERT INTO orders(reference, user_id, total_amount, total_items)
    VALUES ($1, $2, $3, $4)
    RETURNING reference, user_id, total_amount, status, total_items, created_at;
  `,

  createOrderItem: `
    INSERT INTO order_items(reference, order_id, book_id, quantity, amount)
    VALUES ($1, $2, $3, $4, $5);
  `,
};

export default {
  getOrders: `
    SELECT reference, title, ISBN, author, created_at, updated_at
    FROM orders;
  `,

  getPaginatedOrders: `
    SELECT reference, title, ISBN, author, created_at, updated_at
    FROM orders
    OFFSET $1
    LIMIT $2;
  `,

  countPaginatedOrders: `
    SELECT COUNT(id)
    FROM orders;
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

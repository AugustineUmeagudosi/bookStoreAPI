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
  `
};

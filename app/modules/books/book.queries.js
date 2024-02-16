export default {
  getBooks: `
    SELECT reference, title, ISBN, author, created_at, updated_at
    FROM books;
  `,

  getPaginatedBooks: `
    SELECT reference, title, ISBN, author, created_at, updated_at
    FROM books
    OFFSET $1
    LIMIT $2;
  `,

  countPaginatedBooks: `
    SELECT COUNT(id)
    FROM books;
  `
};

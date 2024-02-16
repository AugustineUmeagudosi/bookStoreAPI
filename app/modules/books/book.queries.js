export default {
  getBooks: `
    SELECT reference, title, ISBN, author, price, created_at, updated_at
    FROM books;
  `,

  getPaginatedBooks: `
    SELECT reference, title, ISBN, author, price, created_at, updated_at
    FROM books
    OFFSET $1
    LIMIT $2;
  `,

  countPaginatedBooks: `
    SELECT COUNT(id)
    FROM books;
  `,

  getBooksByArrayOfReferences: `
    SELECT reference, title, ISBN, author, price, created_at, updated_at
    FROM books
    WHERE reference = ANY($1);
  `
};

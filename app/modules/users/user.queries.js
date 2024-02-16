export default {
  getUserByEmailOrReference: `
    SELECT *
    FROM users
    WHERE email = $1 OR reference = $2;
  `,

  createUser: `
    INSERT INTO users(reference, name, email, password)
    VALUES ($1, $2, $3, $4)
    RETURNING reference, name, email, created_at;
  `,
};

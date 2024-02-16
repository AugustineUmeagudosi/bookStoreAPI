const { NODE_ENV, DB_URL, TEST_DB_URL } = process.env;

export default { DATABASE_URL: NODE_ENV === 'test' ? TEST_DB_URL : DB_URL };

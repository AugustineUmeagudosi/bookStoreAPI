CREATE TABLE IF NOT EXISTS plans (
  id SERIAL PRIMARY KEY,
  reference VARCHAR (10) UNIQUE NOT NULL,
  name VARCHAR (50) NOT NULL,
  price VARCHAR NOT NULL,
  duration VARCHAR NOT NULL,
  benefits TEXT[] NOT NULL,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS reservations (
  id SERIAL PRIMARY KEY,
  reference VARCHAR (10) UNIQUE NOT NULL,
  name VARCHAR (50) NOT NULL,
  price FLOAT NOT NULL,
  image VARCHAR,
  description TEXT,
  benefits TEXT[] NOT NULL,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
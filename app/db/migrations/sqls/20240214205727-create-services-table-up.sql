CREATE TABLE IF NOT EXISTS services (
  id SERIAL PRIMARY KEY,
  reference VARCHAR (10) UNIQUE NOT NULL,
  name VARCHAR (50) NOT NULL,
  feature VARCHAR (100),
  description TEXT,
  starting_price FLOAT NOT NULL,
  images TEXT[] NOT NULL,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
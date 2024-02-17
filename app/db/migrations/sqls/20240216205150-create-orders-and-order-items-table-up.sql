CREATE TYPE order_status_enum AS ENUM ('pending', 'delivered');

CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  reference VARCHAR (10) UNIQUE NOT NULL,
  user_id VARCHAR NOT NULL REFERENCES users(reference) ON DELETE RESTRICT,
  total_amount FLOAT NOT NULL,
  status order_status_enum DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_orders_reference ON orders(reference);

CREATE TABLE IF NOT EXISTS order_items (
  id SERIAL PRIMARY KEY,
  reference VARCHAR (10) UNIQUE NOT NULL,
  order_id VARCHAR NOT NULL REFERENCES orders(reference) ON DELETE RESTRICT,
  book_id VARCHAR NOT NULL REFERENCES books(reference) ON DELETE RESTRICT,
  quantity INTEGER NOT NULL,
  amount FLOAT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_order_items_reference ON order_items(reference);
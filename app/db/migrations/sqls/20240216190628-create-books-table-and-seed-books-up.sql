CREATE TABLE IF NOT EXISTS books (
  id SERIAL PRIMARY KEY,
  reference VARCHAR (10) UNIQUE NOT NULL,
  title VARCHAR (100) NOT NULL,
  ISBN VARCHAR (13) UNIQUE NOT NULL,
  author VARCHAR (100),
  amount FLOAT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO books 
  (reference, title, ISBN, author, amount)
VALUES 
  ('7TtlpKGz22', 'To Kill a Mockingbird', '9780061120084', 'Harper Lee', 300),
  ('Fncy2zvXIz', '1984', '9780451524935', 'George Orwell', 400),
  ('2gIsC7wawX', 'The Great Gatsby', '9780743273565', 'F. Scott Fitzgerald', 250),
  ('tbaxdx0d8X', 'Pride and Prejudice', '9780141439518', 'Jane Austen', 350),
  ('XTrcw57P4j', 'The Catcher in the Rye', '9780316769488', 'J.D. Salinger', 200),
  ('G9wauYIHrL', 'To Kill a Mockingbird 2', '9780061120086', 'Harper Lee', 50),
  ('9qMbfHVXOq', 'The Hobbit', '9780618002214', 'J.R.R. Tolkien', 100),
  ('cRs5LchN17', 'Lord of the Flies', '9780140283334', 'William Golding', 49.99),
  ('rxwT3wzTZG', 'Animal Farm', '9780451526342', 'George Orwell', 50.25),
  ('4lDCKwqGBI', 'The Alchemist', '9780061122415', 'Paulo Coelho', 90),
  ('YE17M6xZnM', 'Harry Potter and the Philosophers Stone', '9780747532699', 'J.K. Rowling', 10),
  ('KCADl7IBlV', 'The Da Vinci Code', '9780307474278', 'Dan Brown', 35),
  ('cAzXikPBs6', 'The Hunger Games', '9780439023481', 'Suzanne Collins', 47.95),
  ('rxZGN2ZlF1', 'Gone Girl', '9780307588364', 'Gillian Flynn', 24.35),
  ('qaZGO2ZlF1', 'The Girl with the Dragon Tattoo', '9780307269751', 'Stieg Larsson', 1000);
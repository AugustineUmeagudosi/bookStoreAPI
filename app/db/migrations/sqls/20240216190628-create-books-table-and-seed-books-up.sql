CREATE TABLE IF NOT EXISTS books (
  id SERIAL PRIMARY KEY,
  reference VARCHAR (10) UNIQUE NOT NULL,
  title VARCHAR (100) NOT NULL,
  ISBN VARCHAR (13) UNIQUE NOT NULL,
  author VARCHAR (100),
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO books 
  (reference, title, ISBN, author)
VALUES 
  ('7TtlpKGz22', 'To Kill a Mockingbird', '9780061120084', 'Harper Lee'),
  ('Fncy2zvXIz', '1984', '9780451524935', 'George Orwell'),
  ('2gIsC7wawX', 'The Great Gatsby', '9780743273565', 'F. Scott Fitzgerald'),
  ('tbaxdx0d8X', 'Pride and Prejudice', '9780141439518', 'Jane Austen'),
  ('XTrcw57P4j', 'The Catcher in the Rye', '9780316769488', 'J.D. Salinger'),
  ('G9wauYIHrL', 'To Kill a Mockingbird 2', '9780061120086', 'Harper Lee'),
  ('9qMbfHVXOq', 'The Hobbit', '9780618002214', 'J.R.R. Tolkien'),
  ('cRs5LchN17', 'Lord of the Flies', '9780140283334', 'William Golding'),
  ('rxwT3wzTZG', 'Animal Farm', '9780451526342', 'George Orwell'),
  ('4lDCKwqGBI', 'The Alchemist', '9780061122415', 'Paulo Coelho'),
  ('YE17M6xZnM', 'Harry Potter and the Philosophers Stone', '9780747532699', 'J.K. Rowling'),
  ('KCADl7IBlV', 'The Da Vinci Code', '9780307474278', 'Dan Brown'),
  ('cAzXikPBs6', 'The Hunger Games', '9780439023481', 'Suzanne Collins'),
  ('rxZGN2ZlF1', 'Gone Girl', '9780307588364', 'Gillian Flynn'),
  ('qaZGO2ZlF1', 'The Girl with the Dragon Tattoo', '9780307269751', 'Stieg Larsson');
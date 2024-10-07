CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (name, email) VALUES
  ('Alice Dupont', 'alice.dupont@example.com'),
  ('Bob Martin', 'bob.martin@example.com'),
  ('Charlie Leroy', 'charlie.leroy@example.com');
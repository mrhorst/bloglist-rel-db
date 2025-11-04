CREATE TABLE blogs (
  id SERIAL PRIMARY KEY,
  author text,
  title text NOT NULL,
  url text NOT NULL,
  likes integer DEFAULT 0
);

INSERT INTO blogs (author, title, url)
  VALUES ('test-author', 'test-title', 'test-url');

INSERT INTO blogs (author, title, url)
  VALUES ('My Author', 'My Title', 'My URL');
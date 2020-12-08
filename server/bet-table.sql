DROP TABLE IF EXISTS bet;
CREATE TABLE bet(
  id SERIAL PRIMARY KEY,
  odds INT,
  is_happening INT,
  betName TEXT,
  expires_at TIMESTAMP,
  is_expired INT
);
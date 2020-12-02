DROP TABLE IF EXISTS bet;
CREATE TABLE bet(
  id SERIAL PRIMARY KEY,
  odds INT,
  is_happening;
  betName TEXT,
  expires_at TIMESTAMP,
  is_expired INT, 
);
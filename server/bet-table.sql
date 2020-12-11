DROP TABLE IF EXISTS bet;
CREATE TABLE bet(
  id SERIAL PRIMARY KEY,
  in_favor INT,
  against INT,
  betName TEXT,
  expires_at TIMESTAMP,
  is_expired INT DEFAULT 0
);

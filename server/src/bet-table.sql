DROP TABLE IF EXISTS bet;
CREATE TABLE bet(
  id SERIAL PRIMARY KEY,
  odds INT,
  for INT,
  against INT,
  betName TEXT,
  expires_at TIMESTAMP
);
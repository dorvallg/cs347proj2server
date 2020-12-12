DROP DATABASE IF EXISTS bets;
DROP USER IF EXISTS bet_user@localhost;

CREATE DATABASE bets CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER bet_user@localhost IDENTIFIED WITH mysql_native_password BY 'Laur3nChri$Pr0j2';
GRANT ALL PRIVILEGES ON bets.* TO bet_user@localhost;

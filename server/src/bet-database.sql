DROP DATABASE IF EXISTS bets;
DROP USER IF EXISTS bet_user@localhost;

CREATE DATABASE bets CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER bet_user@localhost IDENTIFIED BY 'LaurenChrisProj2';
GRANT ALL PRIVILEGES ON bets.* TO bet_user@localhost; - u toor
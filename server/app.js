const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

let table = JSON.parse(fs.readFileSync('express.json', 'utf8'));
let connection = mysql.createConnection(table);
connection.connect();

const port = 3443;
app.listen(port, () => {
  console.log("we are here");
});

function rowToObject(row) {
  return {
    odds: row.odds,
    betName: row.betName,
    is_happening: row.is_happening,
  };
}

function rowToObject(row) { 
  return {
    
    betName: row.bet,
    is_happening: row.is_happening,
  };
}

app.get('/bets/:betName/:odds', (request, response) => {
  const query = 'SELECT betName, odds FROM bet WHERE is_expired = 0 AND betName = ? AND odds = ?';
  const params = [request.params.betName, request.params.odds]
  connection.query(query, params, (error, rows) => {
    response.send({
      ok: true,
      bets: rows.map(rowToObject),
    })
  })
})

app.post('/bets/', (request, response) => {
  const query = 'INSERT INTO bet(betName, odds, expires_at) VALUES (?,?,?)';
  const params = [request.body.betName, request.body.odds, request.body.expires_at];
  connection.query(query, params, (error, result) => {
    response.send({
      okay: true,
      id: result.insertId,
    });
  });
});




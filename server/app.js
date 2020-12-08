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

const port = 8443;
app.listen(port, () => {
  console.log("we are here");
});

function rowToObject(row) { 
  return {
    
    betName: row.bet,
    is_happening: row.is_happening,
  };
}

app.get('/betting/:bet/:odds', (request, response) => {
  const query = 'SELECT bet, is_happening, id FROM bet-table WHERE is_expired = 0 AND bet = ? AND odds = ?';
  const params = [request.params.bet, request.params.odds]
  connection.query(query, params, (error, rows) => {
    response.send({
      ok: true,
      memories: rows.map(rowToObject),
    })
  })
})



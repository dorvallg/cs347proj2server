const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

let table = JSON.parse(fs.readFileSync('credentials.json', 'utf8'));
let connection = mysql.createConnection(table);
connection.connect();

const port = 3443;
app.listen(port, () => {
  console.log("we are here");
});

function rowToObject(row) { 
  return {
    id: row.id,
    betName: row.betName,	  
    in_favor: row.in_favor,
    against: row.against,
    expires_at: row.expires_at,
    is_expired: row.is_expired,	  
  };
}

app.get('/bets/:is_expired', (request, response) => {
  const query = 'SELECT betName, in_favor, against, expires_at, is_expired, id FROM bet WHERE is_expired = 0';
  const params = [request.params.betName, request.params.id]
  connection.query(query, params, (error, rows) => {
    response.send({
      ok: true,
      bets: rows.map(rowToObject),
    })
  })
})

app.post('/bets/', (request, response) => {
  const query = 'INSERT INTO bet(betName, in_favor, against, expires_at) VALUES (?,?,?,?)';
  const params = [request.body.betName, request.body.in_favor, request.body.against, request.body.expires_at];
  connection.query(query, params, (error, result) => {
    response.send({
      okay: true,
      id: result.insertId,
    });
  });
});

app.patch('/bets/:id', (request, response) => {
  console.log(request.body);
  const query = 'UPDATE bet SET betName = ?, in_favor = ?, against = ?, expires_at = ?, is_expired = ? WHERE id = ?';
  const params = [request.body.betName, request.body.in_favor, request.body.against, request.body.expires_at, request.body.is_expired, request.params.id];
  connection.query(query, params, (error, result) => {
    response.send({
       ok: true,   
    });
  });	
});

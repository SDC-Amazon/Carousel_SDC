const express = require('express');
const app = express();
const db = require('./db.js')
app.use(express.static(__dirname + '/../dist'));
app.use(express.json());

app.get('/carousel', (req, res) => {

})

app.post('/carousel', (req, res) => {

})

app.listen(3002, () => {
  console.log('server listening on port 3001');
});
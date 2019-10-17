const express = require('express');
const db = require('./db.js')

const app = express();

app.use(express.static(__dirname + '/../dist'));
app.use(express.json());

app.get('/carousel', (req, res) => {
  let id = req.query.id
  db.getCategory(id, (err, results) => {
    if(err) {
      //console.log(err)
    } else {
      res.send(results)
    }
    res.end()
  })
})

app.post('/carousel', (req, res) => {

})

app.listen(3002, () => {
  console.log('server listening on port 3002');
});
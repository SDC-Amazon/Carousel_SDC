const express = require('express');
const db = require('./db.js');
const cors = require('cors');
const fakeData = require('./Generator')
const app = express();
const images = require('./imageDownloader');
require('newrelic')

app.use(express.static(__dirname + '/../dist'));
app.use(express.json());
app.use(cors());

app.get('/carousel', (req, res) => {
  let id = req.query.id;
  db.getCategory(id, (err, results) => {
    if(err) {
      console.log(err);
    } else {
      res.send(results);
    }
    res.end();
  })
})

app.get('/images', (req, res) => {
  let id = req.query.id;
  db.getImages(id, (err,results) => {
    if (err) {
      console.log(err);
    } else {
      res.send(results);
    }
    res.end();
  })
})

app.get('/downloadImages', (req,res) => {
  let qty = req.query.qty;
  images.downloadPics(qty);
  res.send(`generating ${qty} images`);
})
let count = 1;
app.get('/generateFakes', (req,res) => {
 
  fakeData.createCSVFile(count, (err,file) => {
    if (err) {
      console.log(err);
    } else {
      db.writeFileToDB(file,(err,result) => {
        if (err) {
         console.log("error transfering to postgre "+JSON.stringify(err));
        } else 
        {
          count += 100000;
          res.send(result);
        }
      })
      //res.send(file);
    }
  })
})

app.listen(3002, () => {
  console.log('server listening on port 3002');
});
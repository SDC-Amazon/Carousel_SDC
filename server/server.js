const express = require('express');
//const db = require('./db.js');
const db = require('./mongodb.js');
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


app.get('/populatemongo', (req,res) => {
  let count = 1500001;
  let sent = false;
  const createData = (req,res) => {
    
    fakeData.createCSVFile(count, (err,data) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else 
      {
        db.writeToMongo(data,(err,result) => {
          if (err) {
            console.log(err);
            res.send(err);
          } else
          {
            count += 100000;
            if (!sent) {
                res.send(`seeding :${count}`)
                sent = true;
            } 
            console.log(`count :${count}`);
            if (count < 10000000) {
              createData(req,res);
            }
          }
        })
      }
    })
  }
  createData(req,res);
})

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
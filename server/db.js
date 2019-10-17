const mongoose = require('mongoose');
const Products = require('./products.js');
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('db connected!');
});

const atlasDB = 'mongodb+srv://JoelArmendariz:JoelArmendariz_6719@cluster0-osjds.mongodb.net/amishon?retryWrites=true&w=majority'

const localDB = 'mongodb://localhost:amishon'

mongoose.connect(atlasDB, { useNewUrlParser: true });

const productsSchema = new mongoose.Schema({
  id: Number,
  image: String,
  name: String,
  rating: Number,
  price: Number,
  prime: Boolean,
  category_id: Number
});

const products = mongoose.model('products', productsSchema);

// products.insertMany(Products.data, (err, res) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log('successfully seeded');
//   }
// })

const getTitle = (callback) => {
  products.find({category_id: 4}, (err, res) => {
    if (err) {
      callback(err, null)
    } else {
      callback(null, res)
    }
  })
}

module.exports = { getTitle }
const mongoose = require('mongoose');
const db = mongoose.connection;
const Products = require('./products.js');
const Schema = mongoose.Schema;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('db connected!')
})

mongoose.connect('mongodb+srv://JoelArmendariz:JoelArmendariz_6719@cluster0-osjds.mongodb.net/amishon?retryWrites=true&w=majority', { useNewUrlParser: true });

const productsSchema = new mongoose.Schema({
  id: Number,
  image: String,
  name: String,
  rating: Number,
  price: Number,
  prime: Boolean,
  category_id: Number
})

const products = mongoose.model('products', productsSchema);

const getTitle = (callback) => {
  products.find({category_id: 3}, (err, res) => {
    if (err) {
      callback(err, null)
    } else {
      callback(null, res)
    }
  })
}

// products.insertMany(Products.data, (err, res) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log('successfully seeded');
//   }
// })

module.exports = { getTitle }
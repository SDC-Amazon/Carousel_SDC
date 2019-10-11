const mongoose = require('mongoose');
const mongoose = mongoose.connection;
const Schema = mongoose.Schema;

mongoose.on('error', console.error.bind(console, 'connection error:'));
mongoose.once('open', () => {
  console.log('db connected!')
})

mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true });

const products = new Schema({
  id: Number,
  image: String,
  name: String,
  rating: Number,
  price: Number,
  prime: Boolean
})


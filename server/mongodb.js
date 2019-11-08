const mongoose = require('mongoose');
//const Products = require('./products.js');
const mongo = mongoose.connection;

mongo.on('error', console.error.bind(console, 'connection error:'));
mongo.once('open', () => {
   console.log('mongo connected!');
});

const localDB = 'mongodb://127.0.0.1/farmazon'

mongoose.connect(localDB, { useNewUrlParser: true });

const productsSchema = new mongoose.Schema({
  id: Number,
  image: [String],
  name: String,
  rating: Number,
  price: Number,
  prime: Boolean,
  category_id: Number
});

const products = mongoose.model('products', productsSchema);

const writeToMongo = (data,cb) => {
    
    products.insertMany(data, (err, res) => {
      if (err) {
        console.log(err);
        cb(error,null);
      } else {
        cb(null,res);
        console.log('successfully seeded');
      }
    })
    
}

// gets more products related to selected products
const getCategory = (id,callback) => {

    getImages(id, (err,res) => {
        if (err) {
            callback(err,null)
        } else
        {
            console.log(JSON.stringify(res))
           let cat_id = res[0].category_id; 
           console.log(cat_id);
            products.find({category_id: cat_id}, (err,result) => {
                if (err) {
                    console.log(error)
                } else
                {
                    console.log(result)
                    callback(null,result);
                }
            }).limit(25);
        }
    })
   

}

const getImages = (id, callback) => {
    products.find({id:id}, (err, res) => {
        if (err) {
            callback(err, null)
        } else 
        {
            callback(null,res);
        }
    })

}
module.exports = { writeToMongo, getCategory, getImages}
const { Client } = require('pg');
const config = require('./config');


const client = new Client(config);
client.connect();
client.query('SELECT NOW()', (err,res) => {
 if (err) {
   console.log('error connecting to db');
 } else {
   console.log('succesfuly connected to db');
 }
 //client.end();
 //createPostgreDBTable()
})
//const atlasDB = 'mongodb+srv://JoelArmendariz:JoelArmendariz_6719@cluster0-osjds.mongodb.net/amishon?retryWrites=true&w=majority'





const createPostgreDBTable = () => {
  let query = 'CREATE TABLE products (';
  query += 'id SERIAL PRIMARY KEY, image TEXT [],';
  query += 'name VARCHAR(40), rating NUMERIC(1,1),';
  query += 'price NUMERIC(7,2), prime BOOLEAN, category_id SMALLINT)';

  client
  .query(query)
  .then(res => console.log(res))
  .catch(e => console.error(e.stack));
}




const writeFileToDB = (file,cb) => {
  var query = `COPY products(id,image,name,rating,price,prime, category_id)`
  query += `FROM '${file}' DELIMITER ',' CSV HEADER;`
  
  client
  .query(query)
  .then(res => { 
    // check count;
    var count = `SELECT COUNT(*) FROM products`;
    client
    .query(count)
    .then(c =>  cb(null,c))
  })
  .catch(e => cb(e.stack,null));
}

const getCategory = (id, callback) => {
  // find product id
  var query = `SELECT * FROM products WHERE id=${id};` 
  client
  .query(query)
    .then((res) => {
      {
      
        let cat_id = res.rows[0].category_id;
       // console.log("cat id "+JSON.stringify(res.rows[0].id))
        var productsQuery = `SELECT * FROM products WHERE category_id=${cat_id} AND id > ${Number(res.rows[0].id)} LIMIT 25;`
        client
        .query(productsQuery)
        .then((qres) => {
          callback(null, qres.rows);
        })
        .catch( e => callback(e,null));
      
      }
    })
    .catch(e => callback(e,null));
}

const getImages = (id, callback) => {
  var query = `SELECT * FROM products WHERE id=${id};`
  client
  .query(query)
  .then((res) => {
    callback(null,res.rows)
  })
  .catch( e =>  callback(e,null))

  // products.find({id: product}, (err, res) => {
  //   if (err) {
  //     callback(err, null);
  //   } else {
  //     callback(null, res);
  //   }
  // })
}

module.exports = { getCategory, getImages, writeFileToDB, writeToMongo }
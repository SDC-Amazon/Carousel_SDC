const faker = require('faker');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const createCSVFile = (cb) => {
   
        let i = 1;
        let file = `seedfile_${i}.csv`;
        generateRandom(1,62,__dirname+'/csvfiles/'+file, (err,result) => {
            if (err) {
                console.log(err)
            } else  
            {
                console.log('Generated file '+file)
                cb(null, result)
            }
        });
   
    
}

const generateRandom = (start,end,file,cb) => {
    let data = [];
    const csvWriter = createCsvWriter({
    path:file,
    header:[
        {id:'id',title:'id'},
        {id:'image', title:'image'},
        {id:'name',title:'name'},
        {id:'rating',title:'rating'},
        {id:'price',title:'price'}, 
        {id:'prime',title:'prime'},
        {id:'category_id', title:'category_id'} 
        ]
    });

    for (var i = start; i <= end; i++ ) {
        createData(i ,(err,result) => {
            if (err) {
                console.log('error generating record '+i);
            } else {
                console.log('created Data');
                data.push(result);
            }
        })
    }
    csvWriter
    .writeRecords(data)
    .then(() => {
        console.log('created File '+file);
        cb(null,file) 
    
    })
    
}


const createData = (i, callback) => {
    createFake(i, (err,result) => {
        if (err) {
            callback('error creating json',null)
        } else 
        {
            callback(null,result); 
        }
    })
}


const createFake = (i, callback) => {
    var record = {}
    record.id = i;
    record.image = generateRandomPics();
    //record.image = faker.image.imageUrl();
    record.name = faker.commerce.productName();
    record.rating = generateRandomRating();
    record.category_id = generateRandomCategoryId();
    record.price = faker.commerce.price();
    record.prime = faker.random.boolean();    
    callback(null,record);
}


const generateRandomPics = () => {
    let pics = '{';
    var numOfPics = Math.floor(Math.random() * (3) + 1);
    for (let i=0; i<numOfPics; i++) {
        pics += faker.image.imageUrl();
        if (i < numOfPics-1 ) {
            pics += ',';
        }
    }
    return pics + '}';
}

const generateRandomRating = () => {
    return (Math.random()*(5) + 0).toFixed(1); 
}

const generateRandomCategoryId = () => {
    return Math.floor(Math.random()*(5) + 1); 
}
module.exports  = {createCSVFile, createFake }
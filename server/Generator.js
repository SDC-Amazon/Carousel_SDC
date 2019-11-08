const faker = require('faker');
const Path = require('path');
const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const createCSVFile = (count, cb) => {
   
        let i = count;
        let file = __dirname+`/csvfiles/seedfile_${i}.csv`;
        generateRandom(i,i+99999,null, (err,result) => {
            if (err) {
                console.log(err)
            } else  
            {
                //console.log('Generated file '+file)
                cb(null, result)
            }
        });
   
    
}


const getImagesFromDir = (cb) => {
    const imagesFromDir = [];
    const directoryPath = Path.join(__dirname, '/../dist/images');
    fs.readdir(directoryPath,(err,files) => {
        if (err) {
            console.log('Problem scanning dir');
            cb(err,null);
        } else 
        {
            files.forEach( (file) => {
                // create array with existing files;
                imagesFromDir.push(file);
            })
            cb(null,imagesFromDir);
        }

    })

}

const generateRandom = (start,end,file,cb) => {
    var images = [];
    getImagesFromDir((err,res)=> {
        if (err) {
            console.log('error');
        } else
        {
           //console.log('got images' + JSON.stringify(res));
            images =  res;
            createCSV(images);

        }
    })
    const createCSV = (images) => {
            let data = [];
            for (var i = start; i <= end; i++ ) {
                createData(i ,images, (err,result) => {
                    if (err) {
                        console.log('error generating record '+i);
                    } else {
                        data.push(result);
                    }
                })
            }
            if (file === null) {
                cb(null, data);
                return;
            }

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



            csvWriter
            .writeRecords(data)
            .then(() => {
                console.log('created File '+file);
                cb(null,file) 
            })
    }
    
}


const createData = (i, images, callback) => {
    createFake(i, images, (err,result) => {
        if (err) {
            callback('error creating json',null)
        } else 
        {
            callback(null,result); 
        }
    })
}


const createFake = (i, images, callback) => {
    var record = {}
    record.id = i;
    record.image = generateRandomPics(images);
    //record.image = faker.image.imageUrl();
    record.name = faker.commerce.productName();
    record.rating = generateRandomRating();
    record.category_id = generateRandomCategoryId();
    record.price = faker.commerce.price();
    record.prime = faker.random.boolean();    
    callback(null,record);
}

// TODO -- change this function to get a random image from the images dir
const generateRandomPics = (images) => {
    let pics = '{';
    var numOfPics = Math.floor(Math.random() * (3) + 1);
    for (let i=0; i<numOfPics; i++) {
        pics += `/images/${getRandomImage(images)}`;
        if (i < numOfPics-1 ) {
            pics += ',';
        }
    }
    return pics + '}';
}

const getRandomImage = (images) => {

    let randomidx = Math.floor(Math.random() * images.length);
    randomFile = images[randomidx];
    return randomFile;
    
}

const generateRandomRating = () => {
    return (Math.random()*(5) + 0).toFixed(1); 
}

const generateRandomCategoryId = () => {
    return Math.floor(Math.random()*(5) + 1); 
}
module.exports  = {createCSVFile, createFake }
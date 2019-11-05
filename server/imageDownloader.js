
const Fs = require('fs')
const Path = require('path')
const axios = require('axios')
const faker = require('faker')

const downloadImages = (images) => {
    
   
    
   
  
    let promises = [];
    for (var i=0; i < images.length; i++) {

        let func = function(path) {
            return axios.get(path,{method:'get',responseType:'stream'});
        }
        let url = new func(images[i])
       
        promises.push(url);
    }
    axios.all(promises)
    .then(function(results) {
        written = 0;
         results.map(function(r,i) {
             let imgname = `image_${i}.jpg`;
             let path = Path.resolve(__dirname, 'images',imgname);
             const writer = Fs.createWriteStream(path)
             
             writer.on('finish', () => {
                 written++;
                 if (writer.bytesWritten === 0) {
                    console.log(imgname +' :failed');
                    Fs.unlink(path,function() {
                        console.log('removed '+imgname);
                    })
                 }
                if (written === results.length ) {
                    console.log('written all images')
                    }
                 
             ;
             })
             r.data.pipe(writer);
           
            })

    })
    .catch(function(err) { 
        console.log('there was an error '+err)
    })
}

const downloadPics = (number) => {
    const categories = [ 
        'avatar',
        'abstract',
        'animals',
        'business',
        'cats',
        'city',
        'food',
        'nightlife',
        'fashion',
        'nature',
        'sports',
        'technics',
        'transport'
    ];
    let images = [];
    for (var i=0; i<number; i++) {
        // select a random category
        var catidx = Math.floor(Math.random() * categories.length);
        var url = faker.image[categories[catidx]]();
        images.push(url);
    }
   
    downloadImages(images);
    
   
}

module.exports = {downloadPics}

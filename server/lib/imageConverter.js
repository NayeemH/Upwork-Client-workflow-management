const crypto = require('crypto');
const path = require('path');
const fs = require('fs/promises');
const sharp = require('sharp');
const multer = require('multer');

const waterMarkImage = require('./waterMarkImage');

const smallBufferImage = async (buffer) => {
    return await sharp(buffer)
        .rotate()
        .resize({width: 480, height: 360})
        .jpeg()
        .toBuffer();
}



// Buffer storage
const memoryStorage = multer.memoryStorage();

const fileFetch = multer({storage: memoryStorage});


// Save image
const saveImage = async (buffer, mimetype, imageName = 'Concept') => {
    // Make small image buffer
    const resizedImage = await smallBufferImage(buffer);
    const waterMarkBuffer = await waterMarkImage(buffer, imageName);
    
    const ext = mimetype.split('/')[1];
    const name = `${Date.now()}.${crypto.randomBytes(15).toString('hex')}`;

    await Promise.all([
        fs.writeFile(path.resolve(`data/image/original/${name}.${ext}`), waterMarkBuffer),
        fs.writeFile(path.resolve(`data/image/small/${name}.jpeg`), resizedImage),
        fs.writeFile(path.resolve(`private-data/image/${name}.${ext}`), buffer)
    ]);

    return [`${name}.${ext}`, `${name}.jpeg`, `${name}.${ext}`];
}


module.exports = {saveImage, fileFetch};
const crypto = require('crypto');
const path = require('path');
const fs = require('fs/promises');
const sharp = require('sharp');
const multer = require('multer');

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
const saveImage = async (buffer, mimetype) => {
    // Make small image buffer
    const resizedImage = await smallBufferImage(buffer);

    
    const ext = mimetype.split('/')[1];
    const name = `${Date.now()}.${crypto.randomBytes(15).toString('hex')}`;

    await Promise.all([
        fs.writeFile(path.resolve(`data/image/original/${name}.${ext}`), buffer),
        fs.writeFile(path.resolve(`data/image/small/${name}.jpeg`), resizedImage)
    ]);

    return [`${name}.${ext}`, `${name}.jpeg`];
}


module.exports = {saveImage, fileFetch};
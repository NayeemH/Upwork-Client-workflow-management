const fs = require('fs');
const path = require('path');
const Zip = require('adm-zip');


const imageZip = (images, foldername = 'Images') => {
    const zip = new Zip();

    images.forEach((image, i) => {
        const ext = image.path.split('.');

        const buffer = fs.readFileSync(path.resolve(`private-data/image/${image.path}`));
        zip.addFile(`${foldername}/${i + 1} ${image.name}.${ext[ext.length - 1]}`, buffer, '');
        
    });

    const buffer = zip.toBuffer();

    return buffer;
}


module.exports = imageZip;
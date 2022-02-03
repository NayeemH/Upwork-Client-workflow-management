const sizeOf = require('image-size');
const { createCanvas, loadImage } = require('canvas')



const waterMarkImage = (width) => {
    const canvas = createCanvas(width, width);

    const ctx = canvas.getContext('2d');

    ctx.font = '60px sans-serif';
    ctx.strokeStyle = 'rgba(255, 255, 255, 1)';
    ctx.fillStyle = 'rgba(255, 255, 255, 1)';
    ctx.lineWidth = 3;

    ctx.beginPath();
    ctx.lineTo(0, 0);
    ctx.lineTo(width, width);
    ctx.stroke();


    ctx.beginPath();
    ctx.lineTo(width, 0);
    ctx.lineTo(0, width);
    ctx.stroke();


    const text = ctx.measureText('Concept');

    ctx.clearRect(width / 3, width / 3, width / 3, width / 3);
    ctx.clearRect(10, 100 - text.actualBoundingBoxAscent, text.width, text.actualBoundingBoxAscent + 20);
    ctx.clearRect(width - text.width, width - 50 - text.actualBoundingBoxAscent, text.width, text.actualBoundingBoxAscent + 20);

    ctx.fillText('Concept', 10, 100);

    ctx.fillText('Concept', width - text.width, width - 50);    

    return canvas;
}



const FinalImage = async (buffer) => {

    const {width, height} = sizeOf(buffer);

    const canvas = createCanvas(width, height);

    const ctx = canvas.getContext('2d');

    let x, y, d;

    if(width > height) {
        x = (width - height) / 2;
        y = 0;
        d = height;
    }
    else {
        x = 0;
        y = (height - width) / 2;
        d = width;
    }  


    const image = await loadImage(buffer);
 
    ctx.drawImage(image,
        0, 0, width, height,
        0, 0, width, height
    );

    const waterMark = waterMarkImage(d);

    ctx.drawImage(waterMark,
        0, 0, d, d,
        x, y, d, d);


    return canvas.toBuffer();
}

module.exports = FinalImage;
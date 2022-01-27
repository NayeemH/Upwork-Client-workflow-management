const router = require('express').Router();
const Download = require('../../models/download');

const imageZip = require('../../lib/imageZip');
const Step = require('../../models/step');
const Product = require('../../models/product');



router.get('/:token', async (req, res, next) => {
    try {
        const {token} = req.params;

        const download = await Download.findOne({token});

        if(!download) throw Error('Expired or wrong token');


        const products = await Product.find({_id: {$in: download.productList}});


        const querySteps = [];

        products.forEach(product => {
            querySteps.push(product.steps[product.steps.length -1 ]);
        });

        // Find the steps which has contain final image

        const finalImageSteps = await Step.find({_id: {$in: querySteps}});

        const images = [];
        finalImageSteps.forEach((step, i) => {
            if(step.finalImage) {
                images.push({
                    path: step.finalImage,
                    name: products[i].name
                });
            }
        });

        const buffer = imageZip(images, download.name);

        res.set('Content-Type','application/zip');
        res.set('Content-Disposition',`attachment; filename=${download.name}.zip`);
        res.set('Content-Length',buffer.length);
        res.send(buffer);
    }
    catch (err) {
        err.status = 400;
        next(err);
    }
});



module.exports = router;
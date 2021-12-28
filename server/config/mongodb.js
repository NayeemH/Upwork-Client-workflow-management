const mongoose = require('mongoose');

// Mongodb link
const mongodbURL = process.env.MONGO_DB_URL;

// Connecting to mongodb server
mongoose.connect(mongodbURL)
.then(()=> {
    console.log('Mongodb is connected');
})
.catch(err => {
    console.log(`Mongodb error ${err}`);
});

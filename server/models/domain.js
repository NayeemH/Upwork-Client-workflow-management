const mongoose = require('mongoose');


const domainSchema = mongoose.Schema({
    subdomain: {
        type: String,
    },
    companyName: {
        type: String,
    },
    companyLogo: {
        type: String,
    }
}, {timestamps: true});


// Creating a model
const Domain = mongoose.model('domain', domainSchema);


module.exports = Domain;
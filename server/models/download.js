const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const downloadSchema = Schema({
    productList: {
        type: Array,
        required: true
    },
    token: {
        type: String,
        required: true
    },
    name: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 3600 * 7
    }
}, {timestamps: true});



const Download = mongoose.model('download', downloadSchema);

module.exports = Download;
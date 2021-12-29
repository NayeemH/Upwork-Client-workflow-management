const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const productSchema = Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "users"
    },
    productName: {
        type: String,
        required: true,
    }
}, {timestamps: true});


const Product = mongoose.model('products', productSchema);

module.exports = Project;
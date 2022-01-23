const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const productSchema = Schema({
    projectId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "projects"
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String
    },
    steps: {
        type: Array,
        default: []
    }
}, {timestamps: true});







const Product = mongoose.model('products', productSchema);

module.exports = Product;
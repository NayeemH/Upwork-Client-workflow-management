const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const feedbackSchema = Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "users"
    },
    message: {
        type: String,
        required: true
    },
    checked: {
        type: Boolean,
        default: false
    },
    points: {
        type: Array,
    }
})

// Project Users data
const collectionSchema = Schema({
    projectId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "projects"
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    imageType: {
        type: String
    },
    image: {
        type: String,
        required: true
    },
    feedbacks: {
        type: [feedbackSchema]
    },
    createAt: {
        type: Date,
        default: Date.now()
    }
}); 



const Collection = mongoose.model('collection', collectionSchema);


module.exports = Collection;
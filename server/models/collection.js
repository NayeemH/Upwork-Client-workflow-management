const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const feedbackSchema = Schema({
    userName: {
        type: String,
        required: true
    },
    userImage: {
        type: String,
        required: true
    },
    userRole: {
        type: String,
        required: true
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
}, {timestamps: true});

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
}, {timestamps: true}); 



const Collection = mongoose.model('collection', collectionSchema);


module.exports = Collection;
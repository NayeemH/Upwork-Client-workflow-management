const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const feedbackSchema = Schema({
    message: {
        type: String,
        required: true
    },
    points: {
        type: Array,
    }
})

// Project Users data
const collectionSchema = Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
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

const stepSchema = Schema({
    projectId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "projects"
    },
    name: {
        type: String,
        required: true,
    },
    viewed: {
        type: Boolean,
        default: true
    },
    collections: {
        type: [collectionSchema]
    },
    finalCollection: {
        type: Schema.Types.ObjectId,
        default: null
    }
}, {timestamps: true});



const Step = mongoose.model('step', stepSchema);


module.exports = Step;
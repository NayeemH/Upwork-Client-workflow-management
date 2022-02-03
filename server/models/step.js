const mongoose = require('mongoose');
const Schema = mongoose.Schema;



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
        type: Array
    },
    finalImage: {
        type: String,
        default: null
    },
    feedbackLength: {
        type: Number,
        default: 0
    }
}, {timestamps: true});



const Step = mongoose.model('step', stepSchema);


module.exports = Step;
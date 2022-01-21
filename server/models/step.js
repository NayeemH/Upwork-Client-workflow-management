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
    finalCollection: {
        type: Schema.Types.ObjectId,
        default: null
    }
}, {timestamps: true});



const Step = mongoose.model('step', stepSchema);


module.exports = Step;
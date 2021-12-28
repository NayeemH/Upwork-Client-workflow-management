const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const projectSchema = Schema({
    adminId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "users"
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String
    },
    image: {
        type: String
    },
    productList: {
        type: Array
    }
}, {timestamps: true});


const Project = mongoose.model('projects', projectSchema);


// Joi validator
const ProjectTokenValidator = async (data) => {
    const schema = Joi.object({
        name: Joi.string()
        .max(30)
        .required(),

        description: Joi.string()
    });

    const value = await schema.validateAsync(data, {abortEarly: false});

    return value;
}


module.exports = {Project, ProjectTokenValidator};
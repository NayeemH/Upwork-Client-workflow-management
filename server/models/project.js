const Joi = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Project Users data
const projectUserSchema = Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    userType: {
        type: String,
        required: true
    }
});

// Actual project schema
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
    }, 
    projectUser: {
        type: [projectUserSchema]
    }
}, {timestamps: true});


// Creating the project model
const Project = mongoose.model('projects', projectSchema);


// Joi validator
const projectValidator = async (data) => {
    const schema = Joi.object({
        name: Joi.string()
        .max(30)
        .required(),

        description: Joi.string()
    });

    const value = await schema.validateAsync(data, {abortEarly: false});

    return value;
}


module.exports = {Project, projectValidator};
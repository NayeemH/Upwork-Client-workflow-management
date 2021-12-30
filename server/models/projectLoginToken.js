const mongoose = require('mongoose');
const Joi = require('joi');
const Schema = mongoose.Schema;


const projectTokenSchema = Schema({
    adminId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "users"
    },
    projectId: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 3600
    }
}, {timestamps: true});



const ProjectToken = mongoose.model('projectToken', projectTokenSchema);


// Joi validator
const ProjectTokenValidator = async (data) => {
    const schema = Joi.object({
        projectId: Joi.string()
        .required(),

        email:  Joi.string()
        .email()
        .max(254)
        .required(),

        userType: Joi.string()
        .required()
    });

    const value = await schema.validateAsync(data, {abortEarly: false});

    return value;
}



module.exports = {ProjectToken, ProjectTokenValidator};
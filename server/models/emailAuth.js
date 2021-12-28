const mongoose = require('mongoose');
const Joi = require('joi');
const hashingPassword = require('../lib/hashingPassword');
const Schema = mongoose.Schema;

const emailSchema = Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "users"
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: [true, 'Please enter a email']
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [10, 'Minimum password length is 10 characters'],
        maxlength: [127, 'Maximum password length is 100 characters']
    }
});

// Adding the hashing password to the Schema
emailSchema.pre('save', hashingPassword);

// Creating a model
const EmailAuth = mongoose.model('emailauth', emailSchema);



// Joi validator
const EmailAuthValidator = async (data) => {
    const schema = Joi.object({
        email:  Joi.string()
        .email()
        .max(254)
        .required(),

        password: Joi.string()
        .min(10)
        .max(127)
        .required()
    });

    const value = await schema.validateAsync(data, {abortEarly: false});

    return value;
}


module.exports = {EmailAuth, EmailAuthValidator};
const mongoose = require('mongoose');
const {isEmail} = require('validator');


const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please enter a username'],
        trim: true,
        minlength: [2, 'Minimum username length is 2 characters'],
        maxlength: [30, 'Maximum username length is 30 characters']
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        validate: [isEmail, 'Please enter valid email'],
        maxlength: [254, 'Maximum email length is 254 characters']
    }
});


// Creating a model
const User = mongoose.model('users', userSchema);


module.exports = User;
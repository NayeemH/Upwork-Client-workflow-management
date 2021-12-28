const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const tokenSchema = Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "users"
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [10, 'Minimum password length is 10 characters'],
        maxlength: [127, 'Maximum password length is 100 characters']
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

// Setting the expires time       // index({ createdAt: 1 }, { expires: '7d' });
//tokenSchema.index({createdAt: 1}, {expires: 60});


const Token = mongoose.model('token', tokenSchema);

module.exports = Token;
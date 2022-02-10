const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sessionSchema = Schema({
    sessionId: {
        type: String,
        default: 0
    },
    refreshToken: {
        type: String
    },
    verified: {
        type: Boolean,
        default: false
    }
});

const settingsSchema = Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "users"
    },
    userType: {
        type: String,
        default: "user"
    },
    verified: {
        type: Boolean,
        default: false
    },
    twoFactorAuth: {
        type: Boolean,
        default: false
    },
    sessions: {
        type: [sessionSchema],
    },
    domain: {
        type: String,
    }
});



// Creating a model
const Settings = mongoose.model('settings', settingsSchema);


module.exports = Settings;
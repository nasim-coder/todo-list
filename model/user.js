const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        rquired: true
    },
    password: {
        type: String,
        required: true
    }
});

let User = mongoose.model('User', userSchema);
module.exports = User;
const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        rquired: 'correct email is required',
        match: [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please add a valid email address.',],
        dropDups: true
    },
    phone: {
        type: Number,
        required: true,
        validate: {
            validator: function(v) {
                return /d{10}/.test(v);
            },
            message: '{VALUE} is not a valid 10 digit number!'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: [6, 'password shold be more than 6 character'],
        maxlength:[15, 'password should be less than 15 character']
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        required: true
    }
});

let User = mongoose.model('User', userSchema);
module.exports = User;
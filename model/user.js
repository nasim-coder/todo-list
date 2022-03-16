const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: "name is required"
    },
    email: {
        type: String,
        unique: true,
        rquired: 'correct email is required',
        match: [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please add a valid email address.'],
        dropDups: true
    },
    phone: {
        type: String,
        required: "phone number is required",
        minlength: [10, 'mobile number is incorrecthan, it is less than 10 number'],
        maxlength: [10, 'mobile number is incorrect, it is more than 10 number']
    },
    password: {
        type: String,
        required: "password is required",
        minlength: [6, 'password shold be more than 6 character'],
        maxlength:[200, 'password should be less than 200 character']
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    }
});

let User = mongoose.model('User', userSchema);
module.exports = User;
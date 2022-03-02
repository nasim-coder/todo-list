const mongoose = require('mongoose');

let todoSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true,
        default: false
    },
    category: {
        type: String,
        enum: ['work', 'hobby', 'task'],
        required:true
    }
})
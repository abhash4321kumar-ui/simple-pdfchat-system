let mongoose = require('mongoose');

let chatSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    sender: {
        type: String,
        enum: ['user', 'ai'], 
        required: true
    },
    text: {
        type: String,
        required: true
    }
}, { timestamps: true });

let chatmodel = mongoose.model('chat', chatSchema)

module.exports = chatmodel
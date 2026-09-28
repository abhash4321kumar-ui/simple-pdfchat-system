let mongoose = require('mongoose');

let userschema = mongoose.Schema({
    username: { type: String, required: [true, 'please enter username'] },
    email: { type: String, unique: true, required: [true, 'please enter email'] },
    password: { type: String },
    authProvider: { type: String, default: 'manual' },
    isverified: { type: Boolean, default: false },
    hasUploadedPDF: { type: Boolean, default: false },
    questionCount: { type: Number, default: 0 },
    lastQuestionDate: { type: Date, default: null }
}, { timestamps: true });

let usermodel = mongoose.model('user', userschema);

module.exports = usermodel
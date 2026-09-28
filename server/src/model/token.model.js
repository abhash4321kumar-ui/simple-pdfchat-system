let mongoose = require('mongoose')

let tokenschema = mongoose.Schema({
    token: {
        type: String,
        required: true
    }
}, {timestamps: true});

let tokenmodel = mongoose.model('tokenblacklist', tokenschema)

module.exports = tokenmodel
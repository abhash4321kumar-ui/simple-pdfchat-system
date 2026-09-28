let express = require('express')
let userrouter = express.Router();
let { signupfnc, loginfnc, getuserfnc, googleSignupfnc, googleLoginfnc, logoutfnc, verifyfnc, } = require('../controller/user.controller')
let Authmiddleware = require('../middleware/Authmiddleware')

userrouter.post('/signup', signupfnc)

userrouter.get('/verify', verifyfnc)

userrouter.post('/login', loginfnc)

userrouter.get('/user', Authmiddleware, getuserfnc)

userrouter.post('/google-signup', googleSignupfnc);

userrouter.post('/google-login', googleLoginfnc);

userrouter.get('/logout', Authmiddleware, logoutfnc)

module.exports = userrouter
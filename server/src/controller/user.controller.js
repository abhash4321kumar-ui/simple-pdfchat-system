let usermodel = require('../model/user.model')
let bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken')
let { Sendemailfnc, Googleemailfnc } = require('../service/Email.service');
const tokenmodel = require('../model/token.model');

async function signupfnc(req, res, next) {
    try {

        console.log('running main signupfnc!')

        console.log(req.body)

        let { username, email, password } = req.body;



        let checkuser = await usermodel.findOne({
            username: username,
            email: email
        })

        if (checkuser) {
            return res.status(409).json({
                message: 'this user is already exist!'
            })
        }

        let hashpassword = await bcrypt.hash(password, 10)

        let user = await usermodel.create({
            username, email, password: hashpassword
        })

        let sendMail = await Sendemailfnc(username, email)




        res.status(201).json({
            message: `user created successfully verification message send to ${email}!`,
            user: user
        })

    } catch (error) {
        res.status(400).json({
            message: 'something went wrong!',
            error: error
        })
        console.log(error)
    }
}

async function verifyfnc(req, res, next) {
    try {

        let { token } = req.query

        let verifyvalue = jwt.verify(token, process.env.JWT_KEY)


        let finduser = await usermodel.findOne({
            email: verifyvalue.email
        })

        if (!finduser) {
            return res.status(400).json({
                message: 'user not found!'
            })
        }

        finduser.isverified = true
        await finduser.save();

        res.send(`<div style="min-height:100vh; margin:0; background-color:#F6F4EE; font-family: Georgia, 'Times New Roman', serif; display:flex; align-items:center; justify-content:center; padding:24px;">
    <div style="max-width:400px; width:100%; text-align:center; background:#ffffff; border-radius:16px; border:1px solid rgba(22,35,58,0.1); padding:48px 32px; box-shadow:0 1px 3px rgba(0,0,0,0.05);">
        <div style="width:56px; height:56px; border-radius:50%; background-color:rgba(242,169,59,0.15); display:flex; align-items:center; justify-content:center; margin:0 auto 20px auto; font-size:24px;">
            ✓
        </div>
        <h1 style="font-family: Georgia, serif; font-size:22px; color:#16233A; margin:0 0 8px 0;">Account verified</h1>
        <p style="font-family: Arial, sans-serif; font-size:14px; color:rgba(22,35,58,0.6); line-height:1.6; margin:0 0 28px 0;">
            Your email has been successfully verified. You can now sign in and start using Inkwell.
        </p>
        <a href="http://localhost:5173/login"
           style="display:inline-block; text-decoration:none; background-color:#16233A; color:#F6F4EE; font-family: Arial, sans-serif; font-size:14px; font-weight:bold; padding:12px 28px; border-radius:8px;">
            Sign in
        </a>
    </div>
</div>`)

    } catch (error) {
        console.log(error)
        next(error)
    }
}

async function loginfnc(req, res, next) {
    try {

        let { email, password } = req.body

        let checkuser = await usermodel.findOne({
            email: email
        })

        if (!checkuser) {
            return res.status(401).json({
                message: 'unathorized access!'
            })
        }

        if (!checkuser.isverified) {
            return res.status(409).json({
                message: 'please verify your gmail first!'
            })
        }

        let checkpassword = await bcrypt.compare(password, checkuser.password)

        if (!checkpassword) {
            return res.status(409).json({
                message: 'unathorized password!'
            })
        }


        let token = jwt.sign({
            _id: checkuser._id
        }, process.env.JWT_KEY, {
            expiresIn: '1d'
        })

        res.cookie('token', token, { httpOnly: true, secure: false })

        res.status(201).json({
            message: 'user loggedIn succesfully!',
            checkuser: checkuser
        })

    } catch (error) {
        res.status(400).json({
            message: 'something went wrong!',
            error: error
        })
        console.log(error)
    }
}

async function getuserfnc(req, res, next) {
    try {

        let user = await usermodel.findById(req.userId)

        res.status(201).json({
            message: 'fething user data!',
            user: user
        })

    } catch (error) {
        res.status(401).json({
            message: 'something went wrong!',
            error: error
        })
        next(error)
    }
}

async function googleSignupfnc(req, res, next) {
    try {

        console.log('running signup fnc!')

        let { username, email } = req.body;

        console.log(req.body)

        let checkuser = await usermodel.findOne({ email: email });

        if (checkuser) return res.status(409).json({ message: 'User already exists! Please login.' });


        let user = await usermodel.create({
            username,
            email: email,
            authProvider: 'google'
        });

        console.log(user)

        let data = await Googleemailfnc(username, email)

        res.status(201).json({ message: 'Google Signup successful! Check email to login.' });
    } catch (error) {
        next(error);
    }
}

async function googleLoginfnc(req, res, next) {

    console.log('running google login fnc!')

    try {
        let { email, usermail } = req.body;

        console.log(req.body)

        console.log(email)

        let checkuser = await usermodel.findOne({
            $or: [
                { email: email },
                { email: usermail }
            ]
        });

        console.log(email)


        if (!checkuser) return res.status(401).json({ message: 'User not found! Please signup first.' });

        if (!checkuser.isverified) {
            return res.status(409).json({
                message: 'please verify your gmail first!'
            })
        }

        let token = jwt.sign({ _id: checkuser._id }, process.env.JWT_KEY, { expiresIn: '1d' });

        res.cookie('token', token, { httpOnly: true, secure: false });
        res.status(200).json({ message: 'Google Login successful!', checkuser });
    } catch (error) {
        next(error);
    }
}

async function logoutfnc(req, res, next) {
    try {

        let { token } = req.cookies

        let tokenblacklist = await tokenmodel.create({
            token: token
        })

        res.status(200).json({
            message: 'getting token!',
            tokenblacklist: tokenblacklist
        })

    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    signupfnc,
    loginfnc,
    getuserfnc,
    googleSignupfnc,
    googleLoginfnc,
    logoutfnc,
    verifyfnc
}
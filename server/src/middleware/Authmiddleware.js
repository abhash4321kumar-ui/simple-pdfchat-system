const jwt = require('jsonwebtoken'); // Import missing tha
const tokenmodel = require('../model/token.model');

const requireAuth = async (req, res, next) => {

    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Unauthorized, please login" });

    let blacklisttoken = await tokenmodel.findOne({
        token: token
    })

    console.log(blacklisttoken)

    if (blacklisttoken) {
        return res.status(400).json({
            message: 'token is blacklisted!'
        })
    }

    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
        if (err) return res.status(401).json({ message: "Invalid token" });
        req.userId = decoded._id;
        next();
    });
};

module.exports = requireAuth
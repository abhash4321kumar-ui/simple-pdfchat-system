let express = require('express')
let uploadrouter = express.Router();
let fs = require('fs')
let multer = require('multer');
const Authmiddleware = require('../middleware/Authmiddleware');
const { uploadpdf, chatwithpdf, getChatHistory } = require('../controller/upload.controller');

const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });


uploadrouter.post('/upload-pdf', Authmiddleware, upload.single('pdf'), uploadpdf);
uploadrouter.post('/chatwith-pdf', Authmiddleware, chatwithpdf);

uploadrouter.get('/chat-history', Authmiddleware, getChatHistory); 

module.exports = uploadrouter

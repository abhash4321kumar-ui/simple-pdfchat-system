let express = require('express');
let app = express();
let cors = require('cors')
let cookieparser = require('cookie-parser')
const Mainerror = require('./error/Mainerror');
const userrouter = require('./routes/user.routes');
const uploadrouter = require('./routes/upload.route');

app.use(express.json());
app.use(cookieparser());
app.use(cors({
    origin:'http://localhost:5173',
    credentials: true
}))




app.use('/api', userrouter)
app.use('/api', uploadrouter)


app.use(Mainerror)

module.exports = app
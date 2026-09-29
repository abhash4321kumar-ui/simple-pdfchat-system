require('dotenv').config();
let app = require('./src/app')
let databasefnc = require('./src/config/databasefnc')

databasefnc();

let PORT = process.env.PORT || 8080

app.listen(PORT, function () {
    console.log('server is running!')
})
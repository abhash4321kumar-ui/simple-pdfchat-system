require('dotenv').config();
let app = require('./src/app')
let databasefnc = require('./src/config/databasefnc')

databasefnc();

app.listen(8080, function(){
    console.log('server is running!')
})
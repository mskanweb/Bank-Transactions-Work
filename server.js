require('dotenv').config();
const app = require('./src/app');
const connectToDB = require('./src/config/db');
connectToDB();



app.listen(3000, (port)=> {
    console.log(`Server is runing on ${port}`);
});
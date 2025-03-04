const mongoose = require('mongoose')
require('dotenv').config()

const dbConnection = async() =>{
    await mongoose.connect(process.env.MONGO_URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(()=> console.log('MongoDB Connected'))
    .catch((err)=> console.log('Error',err))
}

module.exports = {dbConnection}
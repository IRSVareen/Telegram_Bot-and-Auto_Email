const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/autopdf',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(()=>{console.log('MongoDB Connected Successfully');})
.catch((err)=>{console.error(err)})

module.exports = mongoose
const mongoose = require('mongoose')

const companySchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true
    }
})

module.exports = new mongoose.model('Email', companySchema)